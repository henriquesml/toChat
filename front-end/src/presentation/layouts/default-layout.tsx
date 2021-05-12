import React from 'react'
import {
  Flex
} from '@chakra-ui/react'

export const DefaultLayout: React.FC = ({ children }: any) => {
  return (
    <Flex p="30px" bg="blue.500" w="100vw" h="100vh" >
      {children}
    </Flex>
  )
}
