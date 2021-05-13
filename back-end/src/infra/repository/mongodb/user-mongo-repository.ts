import { MongoHelper } from './mongo-helper'
import {
  AddUserRepository,
  CheckUserByUsernameRepository,
  LoadUserByUsernameRepository,
  AddUserRepositoryParams,
  AddUserRepositoryResult,
  LoadUserByUsernameRepositoryResult,
  CheckUserByUsernameRepositoryResult
} from '@/data/protocols/repository/user'

export class UserMongoRepository
implements
    AddUserRepository,
    CheckUserByUsernameRepository,
    LoadUserByUsernameRepository {
  async add(data: AddUserRepositoryParams): Promise<AddUserRepositoryResult> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(data)
    return result.ops[0] !== null
  }

  async loadByUsername(
    username: string
  ): Promise<LoadUserByUsernameRepositoryResult> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne(
      {
        username
      },
      {
        projection: {
          _id: 1,
          username: 1,
          password: 1
        }
      }
    )
    return user && MongoHelper.map(user)
  }

  async checkByUsername(
    username: string
  ): Promise<CheckUserByUsernameRepositoryResult> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne(
      {
        username
      },
      {
        projection: {
          _id: 1
        }
      }
    )
    return user !== null
  }
}
