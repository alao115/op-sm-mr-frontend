import axios from 'axios'


const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000/'
})

// Alter defaults after instance has been created
const token = localStorage.getItem('miriaa-token')
if (token) authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token

export { authAxios }

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000/'
});