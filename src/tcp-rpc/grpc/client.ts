import * as grpc from 'grpc'
import * as path from 'path'
import * as loader from '@grpc/proto-loader'

let proto = grpc.loadPackageDefinition(
  loader.loadSync(path.resolve(__dirname, "proto/notes.proto"), {
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

client.get({ id: '1' }, (err, data) => {
  if (err) throw err
  console.log('----->', data)
})
