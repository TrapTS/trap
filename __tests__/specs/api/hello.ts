import * as request from 'supertest'
import server from '../../../src/app'

describe('basic route tests', () => {
  test('get index route GET /', async () => {
    const response = await request(server.callback()).get('/v1/hello')
    expect(response.status).toBe(200)
  })
})
