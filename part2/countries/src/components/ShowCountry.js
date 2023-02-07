
const Country = ({country}) => {
  console.log('country lang.:', Object.values(country.languages));
  return(
  <div>
    <h3>{country.name.common}</h3>
    <p>capital: {country.capital[0]}</p>
    <p>area: {country.area}</p>
    <p><b>languages:</b></p>
    <ul>
      {
      Object.values(country.languages).map(l => <li key={l}>{l}</li>)
      }
    </ul>
    <img src={country.flags.png} alt={country.flag}/>
  </div>
  )
}


const ShowCountry = ({countriesToShow}) => {
    if (countriesToShow.length > 10) {
     return( <div>Too many matches, specify another filter</div>)
    }
    else {
      if (countriesToShow.length === 1) {
        return(<Country country={countriesToShow[0]}/>)}
      else {
        return(
          <ul>
            {countriesToShow.map( country => <li key={country.cca3}>{country.name.common}</li>)}
          </ul>
        )
      }
    }
  }

export default ShowCountry