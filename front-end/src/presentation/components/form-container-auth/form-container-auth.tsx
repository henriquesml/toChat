import React from 'react'
import { Flex } from '@chakra-ui/react'
import { FormContainerAuthProps } from './form-container-auth-props'

export const FormContainerAuth: React.FC<FormContainerAuthProps> = ({
  children,
  ...props
}: FormContainerAuthProps) => {
  return (
    <Flex
      gridArea="form"
      height="100%"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Flex>
  )
}
