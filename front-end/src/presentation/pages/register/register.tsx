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
import { RegisterProps } from './register-props'

export const Register: React.FC<RegisterProps> = ({
  createUser,
  saveCurrentUser
}: RegisterProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    username: false,
    password: false,
    confirmPassword: false
  })

  const toast = useToast()

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault()
    setError({
      username: false,
      password: false,
      confirmPassword: false
    })
    try {
      const usernameIsInvald = username === ''
      const passwordIsInvald = password === ''
      const confirmPasswordIsInvald = confirmPassword === '' || password !== confirmPassword
      if ([usernameIsInvald, passwordIsInvald, confirmPasswordIsInvald].includes(true)) {
        setError({
          username: usernameIsInvald,
          password: passwordIsInvald,
          confirmPassword: confirmPasswordIsInvald
        })
        toast({
          title: 'Campos obrigatórios',
          position: 'bottom-right',
          description: 'Para criar sua conta é necessário o preenchimento de todos os campos',
          status: 'error',
          duration: 6000,
          isClosable: true
        })
        return
      }
      setLoading(true)
      const response = await createUser.createUser({
        username: username,
        password: password,
        confirmPassword: confirmPassword
      })
      const user = response
      await saveCurrentUser.save(user.id, user.username)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError({
        username: true,
        password: true,
        confirmPassword: true
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
          <InputLabel
            label="Cofirmação da senha"
            placeholder="Confirme a sua senha"
            mt={5}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            isInvalid={error.confirmPassword}
          />

          <ButtonAuth loading={loading} handleSubmit={handleSubmit}>
            Entrar
          </ButtonAuth>
        </FormBoxAuth>
      </FormContainerAuth>
    </GridAuth>
  )
}
