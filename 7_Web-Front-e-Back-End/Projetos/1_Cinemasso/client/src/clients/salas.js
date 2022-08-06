import axios from 'axios'

async function fetchSalas(){
    const {data} = await axios.get('http://localhost:3001/salas/')
    return data
}

export default {
    fetchSalas,
}