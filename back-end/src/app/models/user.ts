import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface UserInterface extends mongoose.Document {
  username: string,
  password: string
}

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

UserSchema.pre<UserInterface>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

export default mongoose.model<UserInterface>('User', UserSchema)

export function checkPassword(password: string, correctPassword: string): Promise<boolean> {
  return bcrypt.compare(password, correctPassword)
}
