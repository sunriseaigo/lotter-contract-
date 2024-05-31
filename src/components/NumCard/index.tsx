'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from '@chakra-ui/react'

import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useContractEvent,
} from 'wagmi'

import lottoryContractABI from '../../utils/abis/lottory.json'
import { useEffect, useState } from 'react'

const NumberCard = ({
  index,
  num,
  value,
  win,
  reset,
}: {
  index: Number
  num: Number
  value: Number
  win: Number
  reset: Boolean
}) => {
  const [betNumber, setBetNumber] = useState(0)
  const [betAmount, setBetAmount] = useState(0)

  const { data: numberToTotalBet } = useContractRead({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'numberToTotalBet',
    args: [index],
  })

  const { data: betNumbers } = useContractRead({
    address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
    abi: lottoryContractABI,
    functionName: 'numberBetterNum',
    args: [index],
  })

  useEffect(() => {
    if (reset) {
      setBetNumber(0)
      setBetAmount(0)
    }
  }, [reset])

  // useContractEvent({
  //   address: '0x26c04d91E7C8126A27a50502095792E65f7D7Da9',
  //   abi: lottoryContractABI,
  //   eventName: 'BettingReset',
  //   listener() {
  //     setBetNumber(0)
  //     setBetAmount(0)
  //   },
  // })

  useEffect(() => {}, [])

  useEffect(() => {
    if (num === index) {
      console.log('============================================')
      setBetNumber(betNumber + 1)
      setBetAmount(betAmount + value)
    }
  }, [num, value])

  useEffect(() => {
    setBetNumber(parseInt(betNumbers?._hex, 16))
    setBetAmount(parseInt(numberToTotalBet?._hex, 16))
  }, [betNumbers])

  return (
    <Card style={{ width: '19%' }}>
      <CardHeader>
        <Heading size="md" textAlign={'center'}>
          {index}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4" justify="center">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Total Amount
            </Heading>
            <Text pt="2" fontSize="sm">
              {betAmount / 10 ** 18} MATIC
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Total Betters
            </Heading>
            <Text pt="2" fontSize="sm">
              {betNumber} betters
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default NumberCard
