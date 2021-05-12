import React from 'react'
import { Grid } from '@chakra-ui/react'
import { GridAuthProps } from './grid-auth-props'

export const GridAuth: React.FC<GridAuthProps> = ({ children }: GridAuthProps) => {
  return (
    <Grid
      bg="gray.100"
      as="main"
      h="100%"
      w="100%"
      templateColumns="1fr 480px 1fr"
      templateRows="1fr 480px 1fr"
      templateAreas="
        '. logo .'
        '. form .'
        '. . .'
      "
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Grid>
  )
}
