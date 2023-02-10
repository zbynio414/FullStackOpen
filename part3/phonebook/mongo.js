const mongoose = require('mongoose')

const argvLength = process.argv.length



const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
    `mongodb+srv://fullstackopen:${password}@cluster0.yede1yf.mongodb.net/phonebookApp?retryWrites=true&w=majority`
 // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectDB = () => { 
  mongoose.set('strictQuery',false)
  mongoose.connect(url)
}

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: newName,
  number: newNumber,
})

const addNumber = () => {
  contact.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
//    console.log(result);
    mongoose.connection.close()
  })
}

const showAll = () => {
  Contact.find({}).then(result => {
    console.log(`phonebook:`);
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
  mongoose.connection.close()
  })
}

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