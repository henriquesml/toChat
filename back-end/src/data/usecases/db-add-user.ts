import { AddUser, AddUserParams, AddUserResult } from '../../domain/usecases'
import { Hasher, AddUserRepository, CheckUserByUsernameRepository } from '../protocols'

export class DbAddUser implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly checkUserByUsernameRepository: CheckUserByUsernameRepository
  ) {}

  async add(accountData: AddUserParams): Promise<AddUserResult> {
    const exists = await this.checkUserByUsernameRepository.checkByUsername(accountData.username)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      isValid = await this.addUserRepository.add({ ...accountData, password: hashedPassword })
    }
    return isValid
  }
}
