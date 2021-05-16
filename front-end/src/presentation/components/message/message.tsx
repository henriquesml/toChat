import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { MessageProps } from './message-props'

export const Message: React.FC<MessageProps> = ({
  message,
  currentUser
}: MessageProps): JSX.Element => {
  const date = new Date(message.createdAt)
  console.log(date)
  const formatDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getSeconds()}`
  return (
    <Box
      display="flex"
      mt="2"
      mb="2"
      justifyContent={currentUser ? 'flex-end' : 'flex-start'}
      alignItems="flex-start"
    >
      <Box
        maxW="calc(100% - 250px)"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box p="4" bg={currentUser ? 'blue.100' : 'gray.100'}>
          <Box d="flex" alignItems="baseline">
            <Button colorScheme="blue" variant="link">
              {message.author}
            </Button>
          </Box>

          <Box mt="1" fontWeight="semibold" color="gray.700" lineHeight="tight">
            {message.message}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            marginTop="2"
          >
            {formatDate}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
