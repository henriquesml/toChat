import React from 'react'
import { Flex, Heading, HStack, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Logo } from '../logo'
import { HeaderAuthProps } from './header-auth-props'

export const HeaderAuth: React.FC<HeaderAuthProps> = ({ primaryText, secondaryText, linkText, linkTo }: HeaderAuthProps) => {
  return (
    <Flex gridArea="logo" flexDir="column" alignItems="center">
      <Flex h="100px" w="100%" justifyContent="center">
        <Logo />
      </Flex>
      <Flex flexDir="column" alignItems="center" mt="20px">
        <Heading size="md" lineHeight="shorter">
          {primaryText}
        </Heading>
        <HStack>
          <Text fontSize="sm">{secondaryText}</Text>
          <Link to={linkTo}>
            <Button size="sm" variant="link" colorScheme="teal">
              {linkText}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Flex>
  )
}
