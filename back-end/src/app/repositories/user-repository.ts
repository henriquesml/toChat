import { UserModel, UserInterface, checkPassword } from '../models'

export default class UserRepository {
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

  async findOneUser(username: string): Promise<UserInterface | null> {
    return await UserModel.findOne({ username: username })
  }

  async checkUserPass(user: UserInterface, password: string): Promise<boolean> {
    return await checkPassword(password, user.password)
  }
}
