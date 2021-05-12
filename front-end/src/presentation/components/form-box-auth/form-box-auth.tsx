import React from 'react'
import { Flex } from '@chakra-ui/react'
import { FormBoxAuthProps } from './form-box-auth-props'

export const FormBoxAuth: React.FC<FormBoxAuthProps> = ({
  children
}: FormBoxAuthProps) => {
  return (
    <Flex
      gridArea="form"
      w="380px"
      p="30px"
      bg="white"
      borderRadius="md"
      flexDir="column"
      justifyContent="center"
      padding={10}
      boxShadow="md"
    >
      {children}
    </Flex>
  )
}
