import React from 'react'
import { makeApiCreateUser } from '../../usecases/create-user/api-create-user-factory'
import { makeLocalSaveCurrentUser } from '../../usecases/save-current-user/local-save-current-user-factory'
import { makeRegisterValidation } from './register-validation-factory'
import { Register } from '../../../../presentation/pages'

export const makeRegister: React.FC = () => {
  return (
    <Register
      createUser={makeApiCreateUser()}
      saveCurrentUser={makeLocalSaveCurrentUser()}
      validation={makeRegisterValidation()}
    />
  )
}
