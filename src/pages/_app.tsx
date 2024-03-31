import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../theme'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, Chain } from 'wagmi';
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

} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { AlchemyProvider } from '@ethersproject/providers'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

const polygonTestChain: Chain = {
  id: 80001, // Chain ID for Polygon Mainnet
  name: 'Polygon',
  network: 'polygon',
  nativeCurrency: {
    decimals: 18,
    name: 'Polygon',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: { http: ["https://polygon-mumbai.g.alchemy.com/v2/EcSrakQPOXrrDZq9rY3D_JPAlVe6QpBO"] },
    public: { http: ["https://polygon-mumbai.g.alchemy.com/v2/EcSrakQPOXrrDZq9rY3D_JPAlVe6QpBO"] },
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://mumbai.polygonscan.com/' },
  },
  contracts: {
    ensRegistry: {
      address: '0xB3878fD08555F33853BC3F33E251D06045613b68',
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [
    mainnet,
    polygonTestChain
  ],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID || "EcSrakQPOXrrDZq9rY3D_JPAlVe6QpBO" }),
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://polygon-mumbai.g.alchemy.com/v2/EcSrakQPOXrrDZq9rY3D_JPAlVe6QpBO"
        }
      }
    }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'lottery',
  chains
});

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
    <WagmiConfig client={wagmiClient} >
      <RainbowKitProvider chains={chains} modalSize='compact'>
        <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig >
  )
}
