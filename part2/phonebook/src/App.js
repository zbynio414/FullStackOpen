import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
    event.preventDefault() 
    const personObject = {
        name: newName,
        number: newNumber,
    }

    persons.find(n => n.name === newName) ?
    alert(newName + ' is already added to phonebook')
    :
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
   
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>      

        <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>
        <div>
          #old_filter shown with <input value={newSearch} onChange={handleNewSearch} />
        </div>

      <h2>add a new number to phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <ul>
          {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </ul>
    </div>
  )
}

export default App

