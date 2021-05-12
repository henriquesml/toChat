import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GetCurrentUser } from '../../../domain/usecases'

export type RouteProps = {
  isPrivate?: boolean
  getCurrentUser: GetCurrentUser
  Component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  path: string
  exact?: boolean
}
