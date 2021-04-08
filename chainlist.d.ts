
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
}
