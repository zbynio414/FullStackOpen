import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getNames = ({search}) => {
    const request = axios.get(`${baseUrl}/name/${search}`)
    return request.then(response => response.data)
}


export default {getNames}