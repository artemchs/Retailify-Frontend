import { accessToken } from '@/utils/accessToken'
import { refreshTokens } from '@/utils/refreshTokens'
import axios from 'axios'

const client = axios.create()

client.defaults.baseURL =
    import.meta.env.API_BASE_URL ?? 'http://localhost:8080/api  /system'

client.defaults.timeout = 2000

client.defaults.withCredentials = true

client.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${accessToken.value()}`
        config.headers.Accept = 'application/json'
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        return config
    },
    function (err) {
        return Promise.reject(err)
    }
)

let retryCounter = 0

client.interceptors.response.use(
    (response) => {
        // Reset the retry counter on successful responses
        retryCounter = 0
        return response
    },
    async function (error) {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            if (retryCounter < 1) {
                // Limit the number of retries to 1
                retryCounter++
                originalRequest._retry = true
                const at = await refreshTokens()
                if (at) {
                    accessToken.update(at)
                    axios.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${at}`
                    return client(originalRequest)
                } else {
                    window.location.href = '/auth/log-in'
                }
            } else {
                console.error('Max retries exceeded. Unable to refresh token.')
                // Handle the error or redirect as needed
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default client
