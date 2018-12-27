/**
 * layers are visual layers. darker is further back, lighter is close to the user
 * 0 is "ground"
 * negative numbers are below-ground
 * positive nubmers are above-ground
 */
export const layer = (layerIndex, colors) => {
  const groundEntry = Object.entries(colors.raw.neutral).find(
    ([key, value]) => value === colors.background
  );
  return colors.raw.neutral[groundEntry.key + layerIndex * 10];
};
