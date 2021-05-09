import * as Yup from 'yup'
import { ValidReturn } from '../protocols'

export async function userValidator(data: Record<string, unknown>): Promise<ValidReturn> {
  const corretDataShape = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(6)
  })

  if (!(await corretDataShape.isValid(data))) {
    return false
  } else {
    return true
  }
}

export async function createUserValidator(data: Record<string, unknown>): Promise<ValidReturn> {
  const corretDataShape = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(6),
    confirmPassword: Yup.string().required().min(6).oneOf([Yup.ref('password'), null])
  })

  if (!(await corretDataShape.isValid(data))) {
    return false
  } else {
    return true
  }
}
