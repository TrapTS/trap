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
const server: grpc.Server = new grpc.Server()

const notes = [
  { id: '1', title: 'Note 1', content: 'Content 1' },
  { id: '2', title: 'Note 2', content: 'Content 2' }
]

server.addService(proto.NoteService.service, {
  list: () => {
    return notes
  },
  get: (call, callback) => {
    let note = notes.find(n => n.id == call.request.id)
    if (note) {
      callback(null, note)
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found'
      })
    }
  },
  insert: call => {
    let note = call.request
    note.id = 'uuidv1()'
    notes.push(note)
    return note
  },
  update: call => {
    let existingNote = notes.find(n => n.id == call.request.id)
    if (existingNote) {
      existingNote.title = call.request.title
      existingNote.content = call.request.content
      return existingNote
    } else {
      return {
        code: grpc.status.NOT_FOUND,
        details: 'Not found'
      }
    }
  },
  delete: call => {
    let existingNoteIndex = notes.findIndex(n => n.id == call.request.id)
    if (existingNoteIndex != -1) {
      notes.splice(existingNoteIndex, 1)
      return {}
    } else {
      return {
        code: grpc.status.NOT_FOUND,
        details: 'Not found'
      }
    }
  }
})

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
