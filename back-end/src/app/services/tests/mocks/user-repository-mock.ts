import { UserRepositoryProtocol, User } from '../../../repositories/protocols'

export class MockUserRepositoryHappyPath implements UserRepositoryProtocol {
  constructor(private readonly user: User | null) {}
  userExists(username: string): Promise<boolean> {
    return Promise.resolve(false)
  }

  create(username: string, password: string): Promise<boolean> {
    return Promise.resolve(true)
  }

  findOneUser(username: string): Promise<User | null> {
    return Promise.resolve(this.user)
  }

  checkUserPass(user: User, password: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}

export class MockUserRepositoryUnhappyPath implements UserRepositoryProtocol {
  constructor(private readonly exists: boolean) {}

  userExists(username: string): Promise<boolean> {
    return Promise.resolve(this.exists)
  }

  create(username: string, password: string): Promise<boolean> {
    return Promise.resolve(false)
  }

  findOneUser(username: string): Promise<User | null> {
    return Promise.resolve(null)
  }

  checkUserPass(user: User, password: string): Promise<boolean> {
    return Promise.resolve(false)
  }
}
