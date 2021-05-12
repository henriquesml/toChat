import React from 'react'
import { makeApiAuthentication } from '../../usecases/authentication/api-authentication-factory'
import { makeLocalSaveCurrentUser } from '../../usecases/save-current-user/local-save-current-user-factory'
import { Login } from '../../../../presentation/pages'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeApiAuthentication()}
      saveCurrentUser={makeLocalSaveCurrentUser()}
    />
  )
}
