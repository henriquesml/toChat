import React from 'react'
import {
  Flex
} from '@chakra-ui/react'

export const AuthLayout: React.FC = ({ children }: any) => {
  return (
    <Flex bg="gray.100" w="100vw" h="100vh" >
      {children}
    </Flex>
  )
}
