import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import ShowCountry from './components/ShowCountry'

const App = () => {
  const [search, setSearch] = useState('Poland')
  const [countries, setCountries] = useState([])

  useEffect(
    () => {
      countryServices
        .getAll()
        .then((countriesNames) => {
          console.log(countriesNames)
          setCountries(countriesNames)          
        })
    }
    , []
  )
  
  const countriesToShow = 
    countries.filter(country => 
      country.name.common.toLowerCase().includes(search.toLocaleLowerCase()))
      console.log(countriesToShow)   

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }
  
  const Show = () => {
    if (countriesToShow.length > 10) {
     return( <div>Too many matches, specify another filter</div>)
    }
    else {
      if (countriesToShow.length === 1) {return(<div>One Country Info in new component</div>)}
      else {
        return(
          <ul>
            {countriesToShow.map( country => <li key={country.cca3}>{country.name.common}</li>)}
          </ul>
        )
      }
    }
  }

  return (
    <div className="App">
      <form >
        <div>Find countries:</div>
        <input value={search} onChange={handleSearchChange}/>
      </form>
      <ShowCountry countriesToShow={countriesToShow} />     
    </div>
  );
}

export default App;
