export const mergeNetworkConfig = (
  initial: Chain[],
  custom: Array<AtLeastOne<Chain, 'chainId'>>,
): Chain[] => {
  return Object.assign(initial, custom)
}
