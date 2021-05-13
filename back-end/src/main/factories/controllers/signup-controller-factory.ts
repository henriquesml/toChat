import { makeDbAuthentication, makeSignUpValidation, makeDbAddUser, makeLogControllerDecorator } from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddUser(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
