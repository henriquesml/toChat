import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import {
  GridAuth,
  HeaderAuth,
  FormContainerAuth,
  FormBoxAuth,
  ButtonAuth,
  InputLabel
} from '../../components'
import { LoginProps } from './login-props'

export const Login: React.FC<LoginProps> = ({
  authentication,
  saveCurrentUser
}: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    username: false,
    password: false
  })

  const toast = useToast()

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault()
    setError({
      username: false,
      password: false
    })
    try {
      const usernameIsInvald = username === ''
      const passwordIsInvald = password === ''
      if ([usernameIsInvald, passwordIsInvald].includes(true)) {
        setError({
          username: usernameIsInvald,
          password: passwordIsInvald
        })
        toast({
          title: 'Campos obrigatórios',
          position: 'bottom-right',
          description: 'Username e senha são campos obrigatórios',
          status: 'error',
          duration: 6000,
          isClosable: true
        })
        return
      }
      setLoading(true)
      const user = await authentication.auth({
        username: username,
        password: password
      })
      const { id } = user
      await saveCurrentUser.save(id, username)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError({
        username: true,
        password: true
      })
      toast({
        title: 'Falha ao efetuar login',
        position: 'bottom-right',
        description: error.message,
        status: 'error',
        duration: 6000,
        isClosable: true
      })
    }
  }

  return (
    <GridAuth>
      <HeaderAuth
        primaryText="Acesse sua conta, para papear por ai"
        secondaryText="Não possui uma conta?"
        linkText="Registre-se agora mesmo!"
        linkTo="/register"
      />

      <FormContainerAuth>
        <FormBoxAuth>
          <InputLabel
            label="Username"
            placeholder="Informe seu usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            isInvalid={error.username}
          />
          <InputLabel
            label="Senha"
            placeholder="Informe sua senha"
            mt={5}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            isInvalid={error.password}
          />

          <ButtonAuth loading={loading} handleSubmit={handleSubmit}>
            Entrar
          </ButtonAuth>
        </FormBoxAuth>
      </FormContainerAuth>
    </GridAuth>
  )
}
