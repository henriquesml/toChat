import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from './presentation/components'
import { makeLogin, makeRegister } from './main/factories/pages'
import { makeLocalGetCurrentUser } from './main/factories/usecases/get-current-user/local-get-current-user'

function App(): JSX.Element {
  return (
    <ChakraProvider>
      <Router
        getCurrentUser={makeLocalGetCurrentUser()}
        makeLogin={makeLogin}
        makeRegister={makeRegister}
      />
    </ChakraProvider>
  )
}

export default App
