import React, { useEffect, useState, useReducer } from 'react'
import {
  Flex,
  VStack,
  Text,
  Button,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Input,
  IconButton,
  Box
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { LogoWhite, Message } from '../../components'
import { MainProps, MessageType, State } from './main-props'

const initialState = {
  messages: []
}

function reducer(state: State, message: MessageType) {
  return {
    messages: [message, ...state.messages]
  }
}

export const Main: React.FC<MainProps> = ({
  getMessage,
  sendMessage,
  getCurrentUser
}: MainProps) => {
  const [room, setRoom] = useState('general')
  const [currentUser, setCurrentUser] = useState('')
  const [message, setMessage] = useState<string>('')
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getCurrentUser.get().then(user => setCurrentUser(user.username))
    const messages = getMessage.get({ room: room }) as any
    messages.map().on((message: any) => {
      dispatch({
        author: message.author,
        message: message.message,
        createdAt: message.createdAt
      })
    })
  }, [])

  function sendMessageToRoom() {
    sendMessage.send({
      author: currentUser,
      message: message,
      createdAt: String(new Date()),
      room: room
    })
    setMessage('')
  }

  return (
    <Flex w="100%">
      <Flex w="350px" pr="30px">
        <Flex flexDir="column" w="100%">
          <LogoWhite />

          <Flex
            mt="30px"
            flexDir="column"
            w="100%"
            h="100%"
            justifyContent="space-between"
          >
            <Flex flexDir="column">
              <Text fontWeight="bold" mb="10px" fontSize="sm" color="blue.100">
                CANAIS
              </Text>
              <VStack alignItems="flex-start" spacing="2">
                <Button
                  w="100%"
                  variant="ghost"
                  _hover={{ bg: 'blue.400' }}
                  _active={{ bg: 'blue.300' }}
                  fontWeight="light"
                  color="blue.50"
                  display="flex"
                  justifyContent="flex-start"
                  bg="blue.400"
                >
                  📢 Geral
                </Button>
              </VStack>
            </Flex>
            <Flex w="100%" h="100px" bg="blue.400" borderRadius="md">
              <Flex
                p="20px"
                h="100%"
                w="100%"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Flex h="100%" alignItems="center" justifyContent="center">
                  <Avatar
                    border="2px solid"
                    borderColor="white"
                    name="Henrique Schmeller"
                  />
                  <Text ml="10px" color="white" fontSize="sm">
                    Henrique Schmeller
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%" bg="white" borderRadius="lg" p="30px" flexDir="column">
        <Breadcrumb color="gray.600">
          <BreadcrumbItem>
            <BreadcrumbLink>Canais</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Geral</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mt="20px" size="lg">
          Mensagens
        </Heading>
        <Flex
          w="100%"
          h="100%"
          bg="gray.100"
          borderRadius="lg"
          flexDir="column"
        >
          <Flex
            h="calc(100% - 100px)"
            w="100%"
            flexDir="column"
            position="relative"
            bg="#f8f9fa"
            maxHeight="702px"
            float="left"
            overflow="hidden"
            overflowY="auto"
            pl="20px"
            pr="20px"
          >
            {state.messages
              .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
              .map(message => (
                <Message
                  key={message.createdAt}
                  message={message}
                  currentUser={message.author === currentUser}
                />
              ))}
          </Flex>
          <Flex
            height="100px"
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            padding="20px"
            borderBottomRadius="lg"
            bg="gray.200"
          >
            <Input
              width="calc(100% - 60px)"
              size="lg"
              placeholder="Digite algo..."
              onChange={event => setMessage(event.target.value)}
              value={message}
              onKeyPress={e => e.code === 'Enter' && sendMessageToRoom()}
              bg="#fff"
            />
            <IconButton
              size="lg"
              colorScheme="blue"
              aria-label="Enviar"
              icon={<ChatIcon />}
              onClick={() => sendMessageToRoom()}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
