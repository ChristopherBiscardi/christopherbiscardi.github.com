---
title "Bevy Components and glTF"
slug "bevy-components-and-gltf"
tags "bevy" "rust"
byline "Many programs produce glTF. Bevy drives behavior based on Components. What is the right way to combine them?"
published "2025-09-15"
image_url "/opengraph/bevy-components-and-gltf.webp"
---

I'm working on [Skein](https://bevyskein.dev/) which uses Bevy's reflection infrastructure to define a format that can be stored in glTF extras and inserted as Components.
It also provides a Blender addon for fetching the reflection data from Bevy over the Bevy Remote Protocol, turning that into Blender UI, and a glTF export extension to write that data into the glTF file as extras.

This post is about the post-export Bevy side of things, which means loading glTF files and instantiating scenes or other objects from the glTF data, and reflecting component values.

> [!NOTE]
> I've [covered](https://youtu.be/cYxHxQcWGfI) the bevy_gltf crate if you want a deep dive into the loader mechanics

## The Format

Bevy defines components like this:

```rust
#[derive(Component, Reflect)]
#[reflect(Component)]
struct Character {
    name: String
}
```

There are two ways to reflect this data.
If you know the type, then all you need is the values, but if you don't know the type (or, for example, if the type is controlled by the data itself in a glTF file), then you need the full type path.

```json
{
  "my_game::Character": {
    "name": "Hollow Knight"
  }
}
```

## Deserialization

This data can be given directly to Bevy's reflection infrastructure, along with the application's type_registry and the `serde_json::Value` form of the component data (`json_component` here).

```rust
// deserialize
let reflect_deserializer = ReflectDeserializer::new(&type_registry);
let reflect_value = reflect_deserializer.deserialize(json_component).unwrap();

commands.entity(entity).insert_reflect(reflect_value);
```

Bevy's reflection support has made this data processing exceedingly simple.

## Data in glTF

In a glTF file there's basically two places to put data:

- extras
- extensions

We'll cover the tradeoffs later, but in the meantime this is what the data looks like on a material in a glTF file when using glTF extras, which can be placed on basically any glTF object.
The `skein` key is not technically required, but anyone can place any data in this `extras` object, so `skein` is used as a namespace key to avoid issues with other data.

> [!NOTE]
> The data here is stored in an array, which could be seen as a mistake since it doesn't match Bevy's semantics of only allowing one Component type instance per Entity.
> However, this allows DCCs to store multiple values of the same Component type, which can be very useful when debugging.
>
> An example use case would be testing different colliders but having a desire to keep the previous collider's configuration available and not having to re-author it.
> The user could create an additional collider component later in the list, then delete one or the other later.

```json
{
  "doubleSided": true,
  "extras": {
    "skein": [
      {
        "replace_material::UseForceFieldMaterial": {}
      },
      {
        "bevy_light::NotShadowCaster": {}
      },
      {
        "bevy_light::NotShadowReceiver": {}
      }
    ]
  },
  "name": "ForceField",
  "pbrMetallicRoughness": {
    "baseColorFactor": [
      0.800000011920929, 0.800000011920929, 0.800000011920929, 1
    ],
    "metallicFactor": 0,
    "roughnessFactor": 0.5
  }
}
```

## Challenges

Altogether this workflow works quite well but there are a few more hurdles to pass, some of which should block a proposal for a "bevy_components" glTF extension, and some of which shouldn't block.

1. Relationship Components
2. glTF Extras vs Extensions
   a. Allowing arbitrary glTF extensions in Bevy's glTF Loader
3. `Handle`s

### Relationship Components

Relationships in Bevy are `Component`s which store the `Entity` value of another `Entity`.
The [`ChildOf`](https://docs.rs/bevy/0.16.1/bevy/ecs/hierarchy/struct.ChildOf.html) and [`Children`](https://docs.rs/bevy/0.16.1/bevy/prelude/struct.Children.html) components are one example of a Relationship.
This relationship is somewhat special in that the glTF hierarchy (or really, and Entity hierarchy) couldn't exist without it, so it is already encoded as [part of the glTF loader](https://github.com/bevyengine/bevy/blob/fb3b2fc9df31e5e6547bb8cd4ea8269728949c83/crates/bevy_gltf/src/loader/mod.rs#L953) using explicit APIs like [`with_children`](https://docs.rs/bevy/0.16.1/bevy/prelude/struct.EntityWorldMut.html#method.with_children).

Bevy 0.16 made these relationship components widely available for anyone to implement.

Other `Scene` serializations, such as [the example](https://github.com/bevyengine/bevy/blob/fb3b2fc9df31e5e6547bb8cd4ea8269728949c83/assets/scenes/load_scene_example.scn.ron#L4) in the Bevy repo, contain entities that are pre-defined.
These pre-defined entities are mapped into the main world when spawning a scene using [`MapEntities`](https://docs.rs/bevy/0.16.1/bevy/ecs/entity/trait.MapEntities.html).
These pre-defined Entity ids can be used in relationship components... but there's a problem.

```ron
(
  resources: {
    "scene::ResourceA": (
      score: 1,
    ),
  },
  entities: {
    4294967297: (
      components: {
        "bevy_ecs::name::Name": "joe",
        "bevy_transform::components::global_transform::GlobalTransform": ((1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)),
        "bevy_transform::components::transform::Transform": (
          translation: (0.0, 0.0, 0.0),
          rotation: (0.0, 0.0, 0.0, 1.0),
          scale: (1.0, 1.0, 1.0),
        ),
        "scene::ComponentA": (
          x: 1.0,
          y: 2.0,
        ),
        "scene::ComponentB": (
          value: "hello",
        ),
      },
    ),
    4294967298: (
      components: {
        "scene::ComponentA": (
          x: 3.0,
          y: 4.0,
        ),
      },
    ),
  },
)
```

Bevy's glTF loader creates the `Entity` values _in the loader_ at load time, so glTF data in a `.gltf` file doesn't have the `Entity` values available to use for relationship components.

...and it gets worse before it gets better: glTF has no concept of a unique id for a node and in the general case, unique ids are a [hard problem](https://github.com/KhronosGroup/glTF/issues/2337).

> [!NOTE]
> but what about Names? Well they're at most unique-per-type... according to Blender's implementation... which also doesn't guarantee this if using multi-blendfile workflows...
>
> glTF doesn't require unique names.
>
> > Whereas indices are used for internal glTF references, optional names are used for application-specific uses such as display. Any top-level glTF object MAY have a name string property for this purpose. These property values are not guaranteed to be unique as they are intended to contain values created when the asset was authored.
> > \- [gltf spec](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#indices-and-names)

Internal references inside of a glTF file are done by index, not by Name or id.

> [!IMPORTANT]
>
> **TODO:** Can indices even be used? How does the "1-to-1" and "1-to-many" (and future "many-to-many") relationships interact with the internal references, which may or may not be the correct number of instances due to collection instances, etc.
>
> Another option is post-processing the Scene World after the Scenes are loaded.
>
> This post is about the glTF/Bevy side, but the "object id" side of things in Blender would have to convert to either identifiers or indices for the `.gltf` file

### glTF Extras vs Extensions

glTF has roughly two places for handling extra data: extras and extensions.
glTF extras was a practical, works today, approach chosen for Skein because Bevy has great support for them through the `Gltf*Extras` components:

- [`GltfExtras`](https://docs.rs/bevy/latest/bevy/gltf/struct.GltfExtras.html)
- [`GltfMeshExtras`](https://docs.rs/bevy/latest/bevy/gltf/struct.GltfMeshExtras.html)
- [`GltfSceneExtras`](https://docs.rs/bevy/latest/bevy/gltf/struct.GltfSceneExtras.html)
- [`GltfMaterialExtras`](https://docs.rs/bevy/latest/bevy/gltf/struct.GltfMaterialExtras.html)

#### Extras

This encodes a few really nice properties:

- Meshes and Materials are often on the same Bevy Entity, but they can each hold their own custom data, so glTF extras associated with meshes and materials need to have some way of merging. "Prefer the material's components" is a simple, effective choice, but the `GltfMeshExtras` component will still be available.
- `Gltf*Extras` Components can take advantage of `On<Add>` observers to attach to any Entity with extras data. It doesn't even need to come from the glTF file but can be constructed at runtime.
- Users that use glTF sub-assets from the [Gltf](https://docs.rs/bevy/0.16.1/bevy/gltf/struct.Gltf.html) asset, which are not represented as entities, can still access the data required to instantiate the components when piecemealing primitives together with materials by inserting the extras data without doing processing themselves.

  ```rust
  let handle = gltf.named_meshes.get("Sphere").unwrap();
  let gltf_mesh = gltf_meshes.get(handle).unwrap();

  commands.spawn((
      Mesh3d(gltf_mesh.primitives[0].mesh.clone()),
      MeshMaterial3d(materials.force_field.clone()),
      gltf_mesh.primitives[0]
          .extras
          .clone()
          .unwrap_or(GltfExtras::default()),
  ));
  ```

Blender (and similar software), has the concept of "custom properties", which get stored in the `extras` glTF field.
This can be done manually [as I've shown here](https://youtu.be/HfQatgUyFYc) with Avian, which will always be a potential path.

#### Extensions

In the glTF spec, extras are described as "Application-specific data", which to me means "Bevy App specific".

By contrast, extensions are described as being format extensions that could apply across applications.

> glTF defines an extension mechanism that allows the base format to be extended with new capabilities

and describes what an extension is allowed to do:

> Extensions MAY add additional attribute names, accessor types, and/or component types.

So not only can an extension put data everywhere glTF extras can exist, but also global data, attributes, and more.

So, IMO, if we can get an extension to behave appropriately it is the correct place to put Bevy component data in a glTF file.

Challenges for extensions are mostly Bevy-side, where arbitrary extensions are not exposed to users to process.
Current extensions all parse using [the same function signature](https://github.com/bevyengine/bevy/blob/fb3b2fc9df31e5e6547bb8cd4ea8269728949c83/crates/bevy_gltf/src/loader/mod.rs#L1288-L1297).

> [!IMPORTANT]
>
> **TODO:** is there a design for arbitrary glTF extension support? Can we actually usefully expose processing such that someone could feasibly implement a "gltf import plugin" to deal with extension data?
>
> Implementing a hard-coded bevy extension processing into the gltf loader would be the easier path, but implementing "extension support" would be more useful and allow others to implement unrelated extensions.

### Handles

Components, especially rendering related, can often hold `Handle`s to something.
One example is `FogVolume`, which it is easy to image being a Bevy Component placed on a Blender Entity to define a foggy area.
However, `Handle`s only exist at runtime in Bevy, so due to the `Handle`'s existence this `density_texture` _must_ be declared as `None` _always_.
There's no opportunity to specify a `Handle` value outside of at runtime in Bevy, so an alternative component representation would be required, and processing that data either while loading glTF data or `On<Add, AlternativeFogVolume>`.

```rust
struct FogVolume {
    pub fog_color: Color,
    pub density_factor: f32,
    pub density_texture: Option<Handle<Image>>,
    pub density_texture_offset: Vec3,
    pub absorption: f32,
    pub scattering: f32,
    pub scattering_asymmetry: f32,
    pub light_tint: Color,
    pub light_intensity: f32,
}
```

Images in glTF are, again, index references, and Bevy's glTF loader [does load them](https://github.com/bevyengine/bevy/blob/fb3b2fc9df31e5e6547bb8cd4ea8269728949c83/crates/bevy_gltf/src/loader/mod.rs#L597-L609).
This loading happens after animations, but before basically everything else that would have a Component on it.
There's also a relevant note about the texture indices and `Handle` handling:

> In theory we could store a mapping between texture.index() and handle to use
> later in the loader when looking up handles for materials. However this would mean
> that the material's load context would no longer track those images as dependencies.

> [!IMPORTANT]
> "load_context dependencies of components using handles" is an interesting topic to dig into

Images aren't the only handles in use, so using handles like this needs some discovery, but images are the biggest contributor to the impact.

## Collaboration with other editors

Specialized editors like Trenchbroom also sustain the component data in their usage of gltf.
Since they don't mutate glTF assets being placed; All of the component data, whether in extras or extensions, is passed through correctly and instantiated in Bevy without special consideration.
In this way the format described above supports a diverse set of workflows, including any glTF is used in.

- Blender export to single glTF file
- Blender collection exporters + specialized level editor (Trenchbroom, etc) for level design and placement of assets
- reading/writing of component data by arbitrary user scripts or programs

## Supporting other applications

Skein supports Blender using an addon, but there are other applications which can produce glTF, and some of them are likely worth supporting.
At this time its unclear which application would have the next biggest impact to support.
I'll elide a list here so as to not pollute suggestions, but if you are currently using software like Blender that produces glTF please reach out and let me know you'd like to see support for components.

## Last Thoughts

There's a decent amount of solid foundation to have a Bevy components extension and also some open questions to solve before making a proposal.
In the meantime Skein is the testing ground for the functionality and I'm pushing forward the functionality I talk about here.
