import React from 'react'
import { Flex, VStack, Text } from '@chakra-ui/react'
import { Logo } from '../../components'

export const Main: React.FC = () => {
  return (
    <Flex bg="black" w="100%">
      <Flex w="350px" bg="red" pr="30px">
        <Flex flexDir="column" w="100%" bg="pink" >
          <Logo />
          <Flex mt="30px" flexDir="column" w="100%">
            <VStack alignItems="flex-start" spacing="2">
              <Text>A</Text>
            </VStack>
          </Flex>

          <Flex mt="30px" flexDir="column" w="100%">
            <Text>CANAIS</Text>
            <VStack alignItems="flex-start" spacing="2">
              <Text>A</Text>
            </VStack>
          </Flex>
        </Flex >
      </Flex>
      <Flex w="100%" bg="yellow">chat</Flex>
    </Flex>
  )
}
