import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { GetCurrentUser } from '../../../domain/usecases'
import { Route } from '../route'

type RouterProps = {
  makeLogin: React.FC
  makeRegister: React.FC
  getCurrentUser: GetCurrentUser
}

export const Router: React.FC<RouterProps> = ({ makeLogin, makeRegister, getCurrentUser }: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" Component={makeLogin} getCurrentUser={getCurrentUser}/>
        <Route path="/register" Component={makeRegister} getCurrentUser={getCurrentUser} />
      </Switch>
    </BrowserRouter>
  )
}
