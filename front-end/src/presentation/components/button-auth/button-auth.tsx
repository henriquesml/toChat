import React from 'react'
import { Button } from '@chakra-ui/react'
import { ButtonAuthProps } from './button-auth-props'

export const ButtonAuth: React.FC<ButtonAuthProps> = ({ loading, handleSubmit, children }: ButtonAuthProps) => {
  return (
    <Button
      size="lg"
      colorScheme="teal"
      marginTop={6}
      isLoading={loading}
      onClick={e => handleSubmit(e)}
    >
      {children}
    </Button>
  )
}
