import axios from 'axios'


const authAxios = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000/'
})

// Alter defaults after instance has been created
const token = localStorage.getItem('miriaa-token')
// console.log(!!token)
if (token) authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(token)

export { authAxios }

export default axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000/'
});