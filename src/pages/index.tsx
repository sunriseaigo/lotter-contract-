import { Flex, Heading, IconButton, Text, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useContractRead, useAccount, useEnsAddress } from 'wagmi'
import lottoryContract from '../utils/abis/Gambling.json'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'

  const account = useAccount()

  console.log(account.address)

  const { data, isError, isLoading } = useContractRead({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContract.abi,
    functionName: 'owner',
  })
  console.log(data)
  return (
    <>
      <Head>
        <title>TITLE</title>
        <meta name="description" content="DESCRIPTION" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex
          maxW="50ch"
          direction="column"
          mx="auto"
          px="6"
          py="8"
          textAlign="center"
          gap={4}
          borderRadius="xl"
          background="primary"
          mt={8}
        >
          <Heading as="h1">Hello world</Heading>
          <Text>This is a NextJS + Chakra-UI + RainbowKit app template</Text>
          <IconButton
            w="fit-content"
            mx="auto"
            icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
          />
          <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            label="Sign In"
          />
        </Flex>
      </main>
    </>
  )
}
