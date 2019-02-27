import * as request from 'supertest'
import server from '../../../src/app'

describe('basic route tests', () => {
  test('get index route GET /', async () => {
    request(server.pureCore())
      .get('/v1/hello')
      .expect(200)
  })
})
