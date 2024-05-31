'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  useTab,
  useToast,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from '@chakra-ui/react'
import lottoryContractABI from '../../utils/abis/lottory.json'

import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useContractEvent,
} from 'wagmi'

import NumberCard from '@/components/NumCard'

const betNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Admin = () => {
  const toast = useToast()

  const [isActive, setIsActive] = useState(false)
  const [numberToAmount, setNumberToAmount] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])
  const [winNumber, setWinNumber] = useState(0)
  const [betterNumber, setBetterNumber] = useState(0)
  const [betterValue, setBetterValue] = useState(0)
  const [isReset, setIsReset] = useState(true)

  const { data: active } = useContractRead({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'bettingActive',
  })

  const { error: endError, write: endWrite } = useContractWrite({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'endBetting',
  })

  const { write: startWrite, error: startError } = useContractWrite({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'startBetting',
  })

  const { write: reset, error: resetError } = useContractWrite({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'reset',
  })

  useContractEvent({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    eventName: 'BetPlaced',
    listener(better, value, number) {
      console.log(better, value, number)
      toast({
        title: 'Someone just placed the bet',
        description: `${better} just betted on ${parseInt(
          number?._hex,
          16
        )} Number with ${parseInt(value?._hex, 16) / 10 ** 18} MATIC.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      setBetterNumber(parseInt(number?._hex, 16))
      setBetterValue(parseInt(value?._hex, 16))
    },
  })

  useContractEvent({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    eventName: 'BettingStarted',
    listener(log) {
      toast({
        title: 'Betting Started',
        description: `Betting started successfully.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
      setIsReset(false)
    },
  })

  useContractEvent({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    eventName: 'BettingReset',
    listener(num) {
      toast({
        title: 'Betting Reseted',
        description: `Betting successfully Reseted`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
      setIsReset(true)
    },
  })

  useContractEvent({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    eventName: '',
    listener(num) {
      toast({
        title: 'Betting Ended',
        description: `Betting ended successfully...Winning Number is ::: ${parseInt(
          num?._hex,
          16
        )}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
      setIsActive(false)
    },
  })

  useEffect(() => {
    setIsActive(active)
  }, [active])

  useEffect(() => {
    // console.log('START:   ', startError)
    startError &&
      toast({
        title: 'Start Error',
        description: `${startError.reason ? startError.reason : startError}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
  }, [startError])

  useEffect(() => {
    // console.log('START:   ', startError)
    startError &&
      toast({
        title: 'Start Error',
        description: `${resetError.reason ? resetError.reason : resetError}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
  }, [resetError])

  useEffect(() => {
    // console.log('END:  ', endError)

    endError &&
      toast({
        title: 'End Error',
        description: `${endError.reason ? endError.reason : endError}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
  }, [endError])

  return (
    <Layout>
      <Flex justify={'center'} px={{ base: 12 }}>
        <Center>
          <VStack>
            <Flex
              mt={'10'}
              bg={useColorModeValue('white', 'gray.800')}
              color={useColorModeValue('gray.600', 'white')}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 40 }}
              align={'center'}
              justify="end"
            >
              <Button
                px={4}
                fontSize={'md'}
                size="lg"
                // rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                mr={10}
                onClick={() => startWrite()}
              >
                Start Betting
              </Button>
              <Button
                px={4}
                size="lg"
                fontSize={'md'}
                // rounded={'full'}
                bg={'red.400'}
                color={'white'}
                _hover={{
                  bg: 'red.500',
                }}
                mr={10}
                onClick={() => endWrite()}
                _focus={{
                  bg: 'red.500',
                }}
              >
                End Betting
              </Button>

              <Button
                px={4}
                size="lg"
                fontSize={'md'}
                // rounded={'full'}
                bg={'cyan.400'}
                color={'white'}
                _hover={{
                  bg: 'cyan.500',
                }}
                onClick={() => reset()}
                _focus={{
                  bg: 'cyan.500',
                }}
              >
                RESET
              </Button>
            </Flex>

            <Flex
              width={'100%'}
              justify={'space-between'}
              gap={2}
              flexWrap={'wrap'}
              pt={'5'}
            >
              {betNumbers.map((index) => (
                <NumberCard
                  index={index}
                  key={index}
                  num={betterNumber}
                  value={betterValue}
                  win={winNumber}
                  reset={isReset}
                />
              ))}
            </Flex>
          </VStack>
        </Center>
      </Flex>
    </Layout>
  )
}

export default Admin
