import { adaptRoute } from '../adapters'
import { makeSignUpController, makeLoginController } from '../factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
