import * as request from 'supertest'
import server from '../../../src/app'

describe('test hello!!!', () => {
  test('get index route GET /v1/hello!!', async () => {
    request(server.pureCore())
      .get('/v1/hello')
      .expect(200)
  })
})
