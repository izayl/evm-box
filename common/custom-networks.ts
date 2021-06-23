/**
 * Custom Networks have the top priority
 *
 * means CUSTOM_NETWORKS and default config the same `chainId` will use the CUSTOM one merge into the default one.
 */
export const CUSTOM_NETWORKS: Array<AtLeastOne<Chain, 'chainId' | 'name'>> = [
  {
    chainId: 137,
    name: 'Matic Mainnet',
    rpc: ['https://matic-mainnet.chainstacklabs.com'],
  },
]
