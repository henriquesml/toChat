import { UserModel, checkPassword } from '../models'
import { UserRepositoryProtocol, User } from './protocols'

export class UserRepository implements UserRepositoryProtocol {
  userExists(username: string): Promise<boolean> {
    return UserModel.findOne({ username: username }).then(user => {
      return user !== null
    })
  }

  create(username: string, password: string): Promise<boolean> {
    return UserModel.create({ username, password })
      .then(() => true)
      .catch(() => false)
  }

  async findOneUser(username: string): Promise<User | null> {
    return await UserModel.findOne({ username: username })
  }

  async checkUserPass(user: User, password: string): Promise<boolean> {
    return await checkPassword(password, user.password)
  }
}
