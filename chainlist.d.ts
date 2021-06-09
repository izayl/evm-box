
interface NativeCurrency {
  name: string
  symbol: string
  decimals: number
}

interface Chain {
  name: string
  chainId: number
  shortName: string
  chain: string
  network: string
  networkId: number
  nativeCurrency: NativeCurrency
  rpc: string[]
  faucets: string[]
  infoURL: string
  selectCounts?: number
}

interface AddEthereumChainParameter {
  /**
   * the integer ID of the chain as a hexadecimal string
   */
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}
