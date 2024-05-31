import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../theme'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig, Chain } from 'wagmi'
import {
  arbitrum,
  arbitrumGoerli,
  baseGoerli,
  gnosis,
  goerli,
  hardhat,
  localhost,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonZkEvmTestnet,
  sepolia,
  polygonMumbai,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const polygonTestChain: Chain = {
  id: 80002, // Chain ID for Polygon Mainnet
  name: 'Amoy',
  network: 'Amoy',
  nativeCurrency: {
    decimals: 18,
    name: 'Polygon',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: { http: ['https://polygon-amoy.drpc.org'] },
    public: { http: ['https://polygon-amoy.drpc.org'] },
  },
  blockExplorers: {
    default: { name: 'AmoyScan', url: 'https://amoy.polygonscan.com/' },
  },

  testnet: true,
}

const { chains, provider } = configureChains(
  [mainnet, polygonTestChain],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID || "EcSrakQPOXrrDZq9rY3D_JPAlVe6QpBO" }),
    jsonRpcProvider({
      rpc: () => {
        return {
          http: 'https://polygon-amoy.drpc.org',
          // http: 'https://polygon-amoy.drpc.org',
        }
      },
    }),
    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: 'lottery',
  chains,
})

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Recommended',
//       wallets: [rainbowWallet, walletConnectWallet],
//     },
//   ],
//   chains,
//   {
//     appName: 'My RainbowKit App',
//     projectId: 'YOUR_PROJECT_ID',
//   },

// );

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
