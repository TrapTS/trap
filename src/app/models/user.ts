import { Length } from 'class-validator'

export class User {
  id?: number
  username?: string
  password?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export class Login extends User {
  @Length(3, 20)
  username: string
  @Length(6, 30)
  password: string
}

export interface IUser {
  User: User
  Login: Login
}
