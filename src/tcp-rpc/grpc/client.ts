import { loadPackageDefinition, credentials } from 'grpc'
import { resolve } from 'path'
import { promisify } from 'util'
import { loadSync } from '@grpc/proto-loader'

let proto = loadPackageDefinition(
  loadSync(resolve(__dirname, 'proto/notes.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)
const NoteService = proto.NoteService
const client = new NoteService(
  'localhost:50051',
  credentials.createInsecure()
)

const getAsync = promisify(client.get).bind(client)

const test = async () => {
  const result = await getAsync({ id: '1' })
  console.log('------>', result)
}

test()
