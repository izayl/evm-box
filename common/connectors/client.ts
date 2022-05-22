import { createClient } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'

export const client = createClient({
  autoConnect: false,
  connectors: [
    new InjectedConnector(),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
  ],
})
