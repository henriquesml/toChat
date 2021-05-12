import React, { useState } from 'react'
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
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault()
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
          />
          <InputLabel
            label="Senha"
            placeholder="Informe sua senha"
            mt={5}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <InputLabel
            label="Cofirmação da senha"
            placeholder="Confirme a sua senha"
            mt={5}
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />

          <ButtonAuth loading={loading} handleSubmit={handleSubmit}>
            Entrar
          </ButtonAuth>
        </FormBoxAuth>
      </FormContainerAuth>
    </GridAuth>
  )
}
