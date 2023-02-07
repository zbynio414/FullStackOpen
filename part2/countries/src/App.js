import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import ShowCountry from './components/ShowCountry'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(
    () => {
      countryServices
        .getAll()
        .then((countriesNames) => {
          setCountries(countriesNames)          
        })
    }
    , []
  )
  
  const countriesToShow = 
    countries.filter(country => 
      country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
    )

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    //console.log(event.target.value)
  }
  
  return (
    <div>
      <form >
        <div>Find countries:</div>
        <input value={search} onChange={handleSearchChange}/>
      </form>
      <ShowCountry countriesToShow={countriesToShow} />     
    </div>
  );
}

export default App;
