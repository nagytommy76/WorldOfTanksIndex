import axios from 'axios'
const axiosInstance = axios.create({
   // baseURL: 'https://api.worldoftanks.eu/wot',
   baseURL: 'http://localhost:3000/api',
   headers: {
      'Content-Type': 'application/json',
   },
})

export default axiosInstance
