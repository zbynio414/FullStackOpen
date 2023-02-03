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

    persons.find(p => p.name === newName) && 
    window.confirm(newName + ' is already added to phonebook, replace the old number?') ?
      {const modPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.find(p => p.name === newName).id
      } 
      personsServices
        .update(modPersonObject.id, modPersonObject)
        .then(returnedPerson =>{
          setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
          setNewName('')
          setNewNumber('')
        })}

      :

      personsServices
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })    
  }

  const removePerson = (name, id) => {
    if (window.confirm(`delete ${name}?`)) {
      personsServices
        .remove(id)
        .then(returnedPerson =>
          setPersons(persons.filter(person => person.id!==id))
        )
    }
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

  const numbersToShow = 
    persons
    .filter(person => 
      person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>      

        <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>

      <h3>add a new number to phonebook</h3>

        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
        <ul>
          {numbersToShow.map(person => 
          <Numbers 
          key = {person.id}
          person={person}
          removePerson={()=>removePerson(person.name, person.id)}/>
        )}
        </ul>
    </div>
  )
}

export default App

