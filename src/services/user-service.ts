import bcrypt from 'bcryptjs'

import { IxUser, User } from '../model/user-model'

export const signUpNewUser = async (username: string, password: string): Promise<IxUser> => {
  const hashPassword = await bcrypt.hash(password, 10)
  const user = new User({
    Username: username,
    Password: hashPassword,
  })
  const resultUser = await user.save()

  return Promise.resolve(resultUser)
}