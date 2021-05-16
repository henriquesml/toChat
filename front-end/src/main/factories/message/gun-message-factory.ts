import { GunMessage } from '../../../infra/message/gun/gun-message'

export const makeGunMessage = () :GunMessage => {
  return new GunMessage()
}
