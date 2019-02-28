import * as request from 'supertest'
import server from '../../../src/app'

describe('user test!!!', () => {
  test('login test!!', async () => {
    request(server.pureCore())
      .post('/v1/login')
      .set({
        username: 'mr.wang',
        password: '123456'
      })
      .expect(200)
  })
})
