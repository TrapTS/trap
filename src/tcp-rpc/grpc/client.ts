import * as grpc from 'grpc'
import * as path from 'path'
import { promisify } from 'util'
import * as loader from '@grpc/proto-loader'

let proto = grpc.loadPackageDefinition(
  loader.loadSync(path.resolve(__dirname, 'proto/notes.proto'), {
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
  grpc.credentials.createInsecure()
)

const getAsync = promisify(client.get).bind(client)

const test = async () => {
  const result = await getAsync({ id: '1' })
  console.log('------>', result)
}

test()
