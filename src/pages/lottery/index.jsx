'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useAccount,
  useBalance,
  useContractEvent,
} from 'wagmi'
import { ethers } from 'ethers'
import {
  Button,
  ButtonGroup,
  Flex,
  Center,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react'

import lottoryContractABI from '../../utils/abis/lottory.json'

const bettingNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Lottory = () => {
  const toast = useToast()
  const [select, setSelect] = useState(0)
  const [betValue, setBetValue] = useState(0)

  // console.log('Active:::: ', active)

  const { write: placeBettting, error: placeError } = useContractWrite({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    chainId: 80002,
    abi: lottoryContractABI,
    functionName: 'placeBet',
    args: [select],
    overrides: {
      value: ethers.utils.parseEther(`${betValue}`),
    },
  })
  const { write: withdrawWinning, error: withdrawError } = useContractWrite({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    chainId: 80002,
    abi: lottoryContractABI,
    functionName: 'withdrawWinnings',
  })

  useContractEvent({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    eventName: 'BettingEnded',
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
      // setIsEnded(false)
    },
  })

  // console.log(placeBettting)
  const { data: bettingActive } = useContractRead({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'bettingActive',
  })
  // console.log(bettingActive)

  const { data: winningNumber } = useContractRead({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'winningNumber',
  })

  // console.log(winningNumber)

  useEffect(() => {
    placeError &&
      toast({
        title: 'Place Betting Error',
        description: `${placeError.reason ? placeError.reason : placeError}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
  }, [placeError])

  useEffect(() => {
    withdrawError &&
      toast({
        title: 'Place Betting Error',
        description: `${
          withdrawError.reason ? withdrawError.reason : withdrawError
        }`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
  }, [withdrawError])

  return (
    <Layout>
      <Flex spacing={3} justify="center" align={'center'} height={600}>
        <Center>
          <VStack>
            <ButtonGroup variant="outline" spacing="1">
              {bettingNum.map((num) => (
                <Button
                  key={num}
                  variant="solid"
                  colorScheme={select === num ? 'blue' : 'gray'}
                  onClick={() => setSelect(num)}
                >
                  {num}
                </Button>
              ))}
            </ButtonGroup>
            <NumberInput
              min={0}
              max={1}
              step={0.01}
              style={{ width: '100%' }}
              value={betValue}
              onChange={(value) => setBetValue(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              variant="solid"
              colorScheme={'blue'}
              style={{ width: '100%' }}
              onClick={placeBettting}
            >
              Place Bet
            </Button>
            <Button
              variant="solid"
              colorScheme={'cyan'}
              style={{ width: '100%' }}
              onClick={withdrawWinning}
            >
              Withdraw Earnings
            </Button>
          </VStack>
        </Center>
      </Flex>
    </Layout>
  )
}

export default Lottory
