import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
import { ReactElement } from 'react'

import Layout from '@/components/Layout'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <div>
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    </div>
  )
}

export default function SingIn() {
  return (
    <Layout>
      <Container maxW={'8xl'} py={12} pt={40}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}
            >
              Our Story
            </Text>
            <Heading>Make money from your Lottery</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }
            >
              <Feature
                icon={
                  <Icon
                    as={IoAnalyticsSharp}
                    color={'yellow.500'}
                    w={5}
                    h={5}
                  />
                }
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Start Betting'}
              />
              <Feature
                icon={
                  <Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'End Betting'}
              />
              <Feature
                icon={
                  <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Earn Money'}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={
                'data:image/jpeg;base64,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'
              }
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
