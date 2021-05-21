import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
  saveCurrentUser,
  validation
}: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const toast = useToast()
  const history = useHistory()

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault()

    try {
      setLoading(true)
      const error = validation.validate({ username, senha: password })
      if (error) {
        setError(true)
        toast({
          title: error.name,
          position: 'bottom-right',
          description: error.message,
          status: 'error',
          duration: 6000,
          isClosable: true
        })
        setLoading(false)
        return
      }
      const response = await authentication.auth({
        username: username,
        password: password
      })
      const user = response
      await saveCurrentUser.save(user.id, user.username)
      setLoading(false)
      toast({
        title: 'Login efetuado com sucesso',
        position: 'bottom-right',
        description: `Olá ${user.username}, seja bem-vindo de volta.`,
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      history.replace('/')
    } catch (error) {
      setLoading(false)
      setError(true)
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
            isInvalid={!username && error}
          />
          <InputLabel
            label="Senha"
            placeholder="Informe sua senha"
            mt={5}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            isInvalid={!password && error}
          />

          <ButtonAuth loading={loading} handleSubmit={handleSubmit}>
            Entrar
          </ButtonAuth>
        </FormBoxAuth>
      </FormContainerAuth>
    </GridAuth>
  )
}
