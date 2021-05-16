import React from 'react'
import { Main } from '../../../../presentation/pages'
import { makeLocalGetCurrentUser } from '../../usecases/get-current-user/local-get-current-user'
import { makeRemoteGetMessage } from '../../usecases/get-message'
import { makeRemoteSendMessage } from '../../usecases/send-message'
export const makeMain: React.FC = () => {
  return (
    <Main getCurrentUser={makeLocalGetCurrentUser()} getMessage={makeRemoteGetMessage()} sendMessage={makeRemoteSendMessage()}/>
  )
}
