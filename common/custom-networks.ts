/**
 * Custom Networks have the top priority
 *
 * means CUSTOM_NETWORKS and default config the same `chainId` will use the CUSTOM one merge into the default one.
 */
export const CUSTOM_NETWORKS: Array<AtLeastOne<Chain, 'chainId'>> = [
  {
    name: 'Ethereum Mainnet test',
    chainId: 1,
    shortName: 'eth',
  },
]
