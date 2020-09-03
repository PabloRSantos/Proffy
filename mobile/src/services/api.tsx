import axios from 'axios'

const api = axios.create({
    baseURL: 'https://profit-backend09.herokuapp.com'
})

export default api