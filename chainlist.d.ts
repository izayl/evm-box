interface NativeCurrency {
  name: string
  symbol: string
  decimals: number
}

interface Explorer {
  name: string
  url: string
  icon: string
  standard: string
}

interface Chain {
  name: string
  chainId: number
  shortName: string
  chain: string
  // @deprecated check faucet array instead
  // see issue https://github.com/izayl/evm-box/issues/11
  network: string
  networkId: number
  nativeCurrency: NativeCurrency
  rpc: string[]
  faucets: string[]
  infoURL: string
  explorers?: Explorer[]
  selectCounts?: number
}

interface AddEthereumChainParameter {
  /**
   * the integer ID of the chain as a hexadecimal string
   */
  chainId: string
  blockExplorerUrls?: string[] | Explorer[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}
