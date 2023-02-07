import { useState, useEffect } from 'react'
import countryServices from './services/countries'


const App = () => {
  const [search, setSearch] = useState('Poland')
  const [countries, setCountries] = useState([])

  useEffect(
    () => {
      countryServices
        .getNames({search})
        .then((countriesNames) => {
          console.log(countriesNames)
          setCountries(countriesNames)          
        })
    }
  //no second argument to useEffect()
  )


  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }
  
  return (
    <div className="App">
      <form >
        <div>Find countries:</div>
        <input value={search} onChange={handleSearchChange}/>
      </form>
      <ul>
        {countries.map( country => <li key={country.cca3}>{country.name.common}</li>)}
      </ul>
    </div>
  );
}

export default App;
