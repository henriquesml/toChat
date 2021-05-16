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
import { RegisterProps } from './register-props'

export const Register: React.FC<RegisterProps> = ({
  createUser,
  saveCurrentUser,
  validation
}: RegisterProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()
  const toast = useToast()

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault()
    try {
      setLoading(true)
      const error = validation.validate({ username, senha: password, 'confirmação de senha': confirmPassword })
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
        return
      }
      const response = await createUser.createUser({
        username: username,
        password: password,
        confirmPassword: confirmPassword
      })
      const user = response
      await saveCurrentUser.save(user.id, user.username)
      setLoading(false)
      toast({
        title: 'Conta criada com sucesso',
        position: 'bottom-right',
        description: `Olá ${user.username}, sua conta foi criada com sucesso.`,
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      history.replace('/')
    } catch (error) {
      setLoading(false)
      setError(true)
      toast({
        title: 'Falha ao efetuar cadastro',
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
        primaryText="Crie sua conta, para papear por ai"
        secondaryText="Já possui uma conta?"
        linkText="Acesse agora mesmo!"
        linkTo="/login"
      />

      <FormContainerAuth>
        <FormBoxAuth>
          <InputLabel
            label="Username"
            placeholder="Informe seu usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            isInvalid={error}
          />
          <InputLabel
            label="Senha"
            placeholder="Informe sua senha"
            mt={5}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            isInvalid={error}
          />
          <InputLabel
            label="Cofirmação da senha"
            placeholder="Confirme a sua senha"
            mt={5}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            isInvalid={error}
          />

          <ButtonAuth loading={loading} handleSubmit={handleSubmit}>
            Entrar
          </ButtonAuth>
        </FormBoxAuth>
      </FormContainerAuth>
    </GridAuth>
  )
}
