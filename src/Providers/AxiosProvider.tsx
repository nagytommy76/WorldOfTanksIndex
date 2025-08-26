import axios from 'axios'
const axiosInstance = axios.create({
   baseURL: 'https://api.worldoftanks.eu/wot',
   headers: {
      'Content-Type': 'application/json',
   },
})

export default axiosInstance
