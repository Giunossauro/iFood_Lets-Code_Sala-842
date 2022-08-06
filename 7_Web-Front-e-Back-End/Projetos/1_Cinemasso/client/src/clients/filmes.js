import axios from 'axios'

async function fetchFilmes(){
    const {data} = await axios.get('http://localhost:3001/filmes/')
    return data
}

export default {
    fetchFilmes,
}