import axios from 'axios'

async function fetchSessoes(){
    const {data} = await axios.get('http://localhost:3001/sessoes/')
    return data
}

export default {
    fetchSessoes,
}