import React, { useEffect, useState } from 'react'
import { Route as RRDRoute, Redirect } from 'react-router-dom'
import { RouteProps } from './route-props'
import { AuthLayout, DefaultLayout } from '../../layouts'

export const Route: React.FC<RouteProps> = ({
  isPrivate,
  getCurrentUser,
  Component,
  ...rest
}: RouteProps) => {
  const [logged, setLogged] = useState<boolean>()

  useEffect(() => {
    async function verifyLogged(): Promise<void> {
      const userData = await getCurrentUser.get()
      setLogged(!!userData.id)
    }
    verifyLogged()
  }, [Component])

  if (!logged && isPrivate) {
    return <Redirect to="/login" />
  }

  if (logged && !isPrivate) {
    return <Redirect to="/" />
  }

  const Layout = logged ? DefaultLayout : AuthLayout

  return (
    <RRDRoute
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}
