import * as grpc from 'grpc'
import * as path from 'path'

const NoteService = grpc.load(path.resolve(__dirname, 'proto/notes.proto'))
  .NoteService
const client = new NoteService(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

client.get({ id: '1' }, (error, note) => {
  if (!error) {
    console.log('---->', note)
    console.log('Note feched successfully', note)
  } else {
    console.error(error)
  }
})
