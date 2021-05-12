import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { InputLabelProps } from './input-label-props'

export const InputLabel: React.FC<InputLabelProps> = ({ label, id, m, ml, mr, mt, mb, ...props }: InputLabelProps) => {
  return (
    <FormControl id={id} m={m} ml={ml} mr={mr} mt={mt} mb={mb}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} />
    </FormControl>
  )
}
