import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { GetCurrentUser } from '../../../domain/usecases'
import { Route } from '../route'

type RouterProps = {
  makeLogin: React.FC
  makeRegister: React.FC
  makeMain: React.FC
  getCurrentUser: GetCurrentUser
}

export const Router: React.FC<RouterProps> = ({ makeLogin, makeRegister, makeMain, getCurrentUser }: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" Component={makeLogin} getCurrentUser={getCurrentUser}/>
        <Route path="/register" Component={makeRegister} getCurrentUser={getCurrentUser} />
        <Route path="/" Component={makeMain} getCurrentUser={getCurrentUser} isPrivate />
      </Switch>
    </BrowserRouter>
  )
}
