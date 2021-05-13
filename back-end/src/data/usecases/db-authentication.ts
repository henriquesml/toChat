import { Authentication, AuthenticationParams, AuthenticationResult } from '@/domain/usecases'
import { LoadUserByUsernameRepository, HashComparer } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth(authenticationParams: AuthenticationParams): Promise<AuthenticationResult> {
    const account = await this.loadUserByUsernameRepository.loadByUsername(authenticationParams.username)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        return {
          id: account.id,
          username: account.username
        }
      }
    }
    return null
  }
}
