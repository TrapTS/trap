import { HelloService } from '../../../../src/app/services/hello'

describe('HelloService!!!', () => {
  test('test index function!!', async done => {
    const service = await new HelloService()
    const result = await service.index('Hello')
    expect(result.result).toBe('Hello')
    done()
  })
})
