import { useState, useEffect } from 'react'
import axios from 'axios'
import personsServices from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const addName = (event) => {
    event.preventDefault() 
    const personObject = {
        name: newName,
        number: newNumber,
    }

    persons.find(n => n.name === newName) ?
    alert(newName + ' is already added to phonebook')
    :
    personsServices
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>      

        <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>

      <h3>add a new number to phonebook</h3>

        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

        <Numbers persons={persons} newSearch={newSearch} />

    </div>
  )
}

export default App

