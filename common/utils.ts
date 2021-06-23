export const mergeNetworkConfig = (
  initial: Chain[],
  custom: Array<AtLeastOne<Chain, 'chainId'>>,
): Chain[] => {
  return initial.map(item => {
    const customItem = custom.find(c => c.chainId === item.chainId)

    if (customItem) return Object.assign({}, item, customItem)

    return item
  })
}
