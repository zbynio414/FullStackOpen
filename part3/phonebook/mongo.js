const mongoose = require('mongoose')

const argvLength = process.argv.length

switch (argvLength) {
  case 1 || 2 :
    console.log('give passward as argument')
    process.exit(1)
    break;
  case 3:
    connectDB()
    showAll()
    break;
  case 5:
    connectDB()
    addNumber()
    break;
  default:
    console.log('wrong command, use format: <node mongo.js yourpassword Name Number>')
    process.exit(1)
    break;
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
    `mongodb+srv://fullstackopen:${password}@cluster0.yede1yf.mongodb.net/phonebookApp?retryWrites=true&w=majority`
 // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
const connectDB = () => {mongoose.connect(url)}

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Number = mongoose.model('Number', noteSchema)

const number = new Number({
  name: newName,
  number: newNumber,
})

const addNumber = () => {
  note.save().then(result => {
    console.log('note saved!')
    console.log(result);
    mongoose.connection.close()
  })
}

const showAll = () => {
  Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
    })
  mongoose.connection.close()
  })
}