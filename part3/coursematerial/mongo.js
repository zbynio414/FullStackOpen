const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstackopen:${password}@cluster0.yede1yf.mongodb.net/noteApp?retryWrites=true&w=majority`
 // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy2',
  important: true,
})
/*Create
note.save().then(result => {
  console.log('note saved!')
  console.log(result);
  mongoose.connection.close()
})
*/

//Note.find({}).then(result => {
Note.find({ important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})