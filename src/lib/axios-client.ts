import axios from 'axios'
import { env } from 'process'

const axiosClient = axios.create()

axiosClient.defaults.baseURL =
  env.API_BASE_URL ?? 'http://localhost:3000/system'

axiosClient.defaults.timeout = 2000

axiosClient.defaults.withCredentials = true

export default axiosClient
