
const Numbers = ({person, removePerson}) =>{
    return(
    <ul>
        <ul>
          <li key={person.name}>{person.name} {person.number}
          <button onClick={removePerson}>delete</button>
          </li>
        </ul>
    </ul>
    )
}

export default Numbers