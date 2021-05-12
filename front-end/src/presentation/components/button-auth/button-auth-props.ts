import { ReactNode } from 'react'

export type ButtonAuthProps = {
  children: ReactNode
  loading: boolean
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
