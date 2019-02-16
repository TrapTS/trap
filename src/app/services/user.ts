import { BaseService } from '../common/base_service'
import knex from '../../database'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { User } from '../models/user'

export class UserService extends BaseService {
  private createToken(user: User): string {
    let created_at: Date = new Date()
    created_at.setDate(created_at.getDate() + 30)
    let timeStamp: number = Date.parse(created_at.toString())
    let payload: Object = {
      sub: user,
      exp: timeStamp
    }
    return sign(payload, 'trap')
  }

  async login(params) {
    const account: User = await knex('account')
      .whereNotNull('deleted_at')
      .where('username', params.username)
      .first()
    if (!account) this.error(404, '该账号不存在！！！')
    if (compare(params.password, params.password)) {
      const token = this.createToken(account)
      return {
        token: token
      }
    } else {
      this.error(401, '登录失败')
    }
  }
}
