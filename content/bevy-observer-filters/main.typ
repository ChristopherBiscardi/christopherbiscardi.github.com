#import "/lib.typ": template, highlight, note

#metadata((
  "title": "Bevy Observer Filters",
  "slug": "bevy-observer-filters",
  "tags": ("bevy", "rust"),
  "byline": "Using On<Event, Filter> for fun and profit",
  "image_url": "/opengraph/bevy-observer-filters.webp",
  "published": "2025-10-17",
)) <frontmatter>

#show: doc => template(
  "Bevy Observer Filters",
  [#doc]
)



Let's say you have a `HealthPointsPlugin` that provides an `Hp`
component. This plugin automatically fires `Death` events for an entity
when hp is lowered to 0.

Let's also say you have a bunch of different enemy types. Blobs,
Zombies, etc, that all despawn on `Death`, but also a `PracticeEnemy`
that lives in the lobby before a game. This `PracticeEnemy` has
different logic `On<Death>` as it just refills its health meter (or
maybe another enemy splits into two enemies, etc. Specific logic is the
point.)

It seems straightforward to use a global observer and a `match` to
dispatch/execute `On<Death>` logic, but what if you want to encapsulate
`PracticeEnemy` in its own `Plugin`?

How would an observer be written such that a user can
`commands.trigger(Death{entity})` and listen for what people think is
`On<Death, PracticeEnemy>`.

Given an `HpPlugin` that looks vaguely like this:

```rust
use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, startup)
        .add_observer(|trigger: On<Death>| {
            info!(
                observer=?trigger.observer(),
                target= ?trigger.entity,
                event=?trigger.event(),
                "unfiltered",
            );
        })
        .add_observer(health)
        .run();
}

#[derive(Component)]
struct Hp(u32);

/// Hit does 10 damage
#[derive(EntityEvent)]
struct Hit {
    entity: Entity,
}

fn health(
    hit: On<Hit>,
    mut hps: Query<&mut Hp>,
    mut commands: Commands,
) {
    let Ok(mut hp) = hps.get_mut(hit.entity) else {
        return;
    };
    // every hit does 10 damage. such a fancy system.
    match hp.0.checked_sub(10) {
        Some(new_health) => {
            hp.0 = new_health;
        }
        None => {
            hp.0 = 0;
            commands.trigger(Death { entity: hit.entity })
        }
    }
}

#[derive(Component)]
struct Player;

#[derive(Component)]
struct Enemy;

#[derive(Component)]
struct PracticeEnemy;

fn startup(mut commands: Commands) {
    let id = commands.spawn((Player, Hp(5)));
    let id2 = commands.spawn((Enemy, Hp(5)));
    let id3 = commands.spawn((PracticeEnemy, Hp(5))).id();

    commands.trigger(Hit { entity: id3 });
}

#[derive(Debug, EntityEvent)]
struct Death {
    entity: Entity,
}
```

We have a few options:

= Option 1 Entity Observers
<option-1-entity-observers>
Add new observer to every entity (entity observers) This works; but why
are we adding new observers when every type has "one handler" each.

```rust
fn practice_enemy_death(death: On<Death>) {}
fn generic_death(death: On<Death>) {}
```

= Option 2 A global observer
<option-2-a-global-observer>
This requires the observer filter all components.

downsides include it being application-level logic that therefore
doesn't fit in a well-scoped Plugin

On the upside: 1 observer, can handle everything in one place. Good for
application-wide style code.

```rust
fn all_deaths(
    death: On<Death>,
    query: Query<Entity, With<PracticeEnemy>>,
) {
    match query.get(death.entity) {
        Ok(_) => todo!("practice_enemy logic"),
        Err(_) => todo!("generic logic"),
    }
}
```

= Option 3 Dedicated Events
<option-3-dedicated-events>
Dedicated events per type work, but require a user to know which one to
fire for which entity. Alternatively, they can be dispatched from a
global "routing" observer. This means requiring a general `Death` event,
an application-level router, and specific `PracticeEnemyDeath` observers
in plugins.

```rust
#[derive(EntityEvent)]
struct PracticeEnemyDeath {
    entity: Entity,
}
#[derive(EntityEvent)]
struct GenericDeath {
    entity: Entity,
}
```

= The Goal
<the-goal>
Ideally this would fit into its own plugin that decides what happens to
itself when it dies. `HpPlugin` would be a generic system firing `Death`
events, but the functionality for reacting to death, etc is "opt in".

current downsides to this next codeblock:

- Death triggers all observers for all entities; filtering happens
  afterwards
- "generic" Death observer is now invalid, since the "PracticeEnemy
  observer" is trying to override its behavior
- this results in the "global death observer" needing to filter out
  PracticeEnemy, or running additionally, causing two Death handlers

```rust
struct PracticeEnemyPlugin;

impl Plugin for PracticeEnemyPlugin {
    fn build(&self, app: &mut App) {
        app.add_observer(practice_enemy_death_observer);
    }
}

fn practice_enemy_death_observer(
    death: On<Death>,
    query: Query<Entity, With<PracticeEnemy>>,
) {
    let Ok(entity) = query.get(death.entity) else {
        return
    };
    // do specific logic
}
```

== The Option Everyone Reaches For
<the-option-everyone-reaches-for>
Something I've seen people try to do an observer that "filters" on
existing components. This does not work as expected… but could it?

```rust
fn fake_filtered_observer(death: On<Death, PracticeEnemy>) {
}
```

== The Working Code
<the-working-code>
Which brings us to the implementation. Here's an example application
that filters `Death` events and only fires them for the components that
are actually on an entity. This allows the definition of filtered
`On<Death, Player>` observers.

It's a decent amount of code, but maybe that could be improved
ergonomically. This example is just proving the feasibility, not the
ideal end-user api.

That said, the end-user api once implemented is

```rust
commands.queue(DeathCommand(hit.entity))
```

and

```rust
fn death(death: On<Death, PracticeEnemy>) {
    info!(
        observer=?death.observer(),
        target= ?death.entity,
        event=?death.event(),
        "death to practice enemy",
    );
}
```

Which is pretty close to the original goal, even though it doesn't quite
"fit" in the Observers `.trigger` sense.

```rust
use bevy::prelude::*;

use crate::{health::*, practice::*};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .register_type::<Player>()
        .add_plugins((
            HealthPlugin::<(PracticeEnemy, Player)>::default(),
            PracticeEnemyPlugin,
        ))
        .add_systems(Startup, startup)
        .add_observer(|trigger: On<Death>| {
            info!(
                observer=?trigger.observer(),
                target= ?trigger.entity,
                event=?trigger.event(),
                "unfiltered",
            );
        })
        .add_observer(|death: On<Death, Player>| {
            info!(
                observer=?death.observer(),
                target= ?death.entity,
                event=?death.event(),
                "death to Player",
            )
        })
        .run();
}

#[derive(Component, Reflect)]
#[reflect(Component)]
struct Player;

#[derive(Component)]
struct Enemy;

fn startup(mut commands: Commands) {
    let id1 = commands.spawn((Player, Hp(5))).id();
    let id2 = commands.spawn((Enemy, Hp(5))).id();
    let id3 = commands.spawn((PracticeEnemy, Hp(5))).id();

    commands.trigger(Hit { entity: id1 });
    commands.trigger(Hit { entity: id2 });
    commands.trigger(Hit { entity: id3 });
}

mod health {
    use bevy::{
        ecs::{
            component::ComponentId,
            event::EntityComponentsTrigger,
        },
        prelude::*,
    };
    use std::marker::PhantomData;

    #[derive(Resource)]
    struct DeathComponentsFilters(Vec<ComponentId>);

    pub struct HealthPlugin<T> {
        death_markers: PhantomData<T>,
    }

    impl<T: bevy::prelude::Bundle> Plugin for HealthPlugin<T> {
        fn build(&self, app: &mut App) {
            app.add_observer(health);
        }

        fn finish(&self, app: &mut App) {
            // register bundle regardless, because we need its ids
            // on the next line and some components aren't registered yet
            let components = app
                .world_mut()
                .register_bundle::<T>()
                .contributed_components()
                .to_vec();
            app.insert_resource(DeathComponentsFilters(
                components,
            ));
        }
    }
    impl<T> Default for HealthPlugin<T> {
        fn default() -> Self {
            Self {
                death_markers: Default::default(),
            }
        }
    }

    #[derive(Component)]
    pub struct Hp(pub u32);

    /// Hit does 10 damage
    #[derive(EntityEvent)]
    pub struct Hit {
        pub entity: Entity,
    }

    #[derive(Debug, EntityEvent)]
    #[entity_event(trigger = EntityComponentsTrigger<'a>)]
    pub struct Death {
        pub entity: Entity,
    }

    fn health(
        hit: On<Hit>,
        mut hps: Query<&mut Hp>,
        mut commands: Commands,
    ) {
        let Ok(mut hp) = hps.get_mut(hit.entity) else {
            return;
        };
        // every hit does 10 damage. such a fancy system.
        match hp.0.checked_sub(10) {
            Some(new_health) => {
                hp.0 = new_health;
            }
            None => {
                hp.0 = 0;
                // regular EntityEvent trigger
                // commands
                //     .trigger(Death { entity: hit.entity })
                info!(entity=?hit.entity,"hit");
                commands.queue(DeathCommand(hit.entity));
            }
        }
    }
    struct DeathCommand(Entity);
    impl Command for DeathCommand {
        fn apply(self, world: &mut World) -> () {
            let components = world
                .get_resource::<DeathComponentsFilters>()
                .unwrap();

            let active_components = components
                .0
                .iter()
                .filter(|id| {
                    world.entity(self.0).contains_id(**id)
                })
                .cloned()
                .collect::<Vec<ComponentId>>();

            world.trigger_with(
                Death { entity: self.0 },
                EntityComponentsTrigger {
                    components: &active_components,
                },
            );
        }
    }
}

mod practice {
    use bevy::prelude::*;

    use crate::health::Death;

    pub struct PracticeEnemyPlugin;

    impl Plugin for PracticeEnemyPlugin {
        fn build(&self, app: &mut App) {
            app.add_observer(death);
        }
    }

    #[derive(Component)]
    pub struct PracticeEnemy;

    fn death(death: On<Death, PracticeEnemy>) {
        info!(
            observer=?death.observer(),
            target= ?death.entity,
            event=?death.event(),
            "death to practice enemy",
        );
    }
}
```
