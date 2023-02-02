
const Numbers = ({persons, newSearch}) =>{
    return(
    <ul>
        <ul>
          {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
    </ul>
    )
}

export default Numbers