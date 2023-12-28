import { Outlet, useNavigate } from '@tanstack/react-router'
import { AppProvider } from './providers/AppProvider'
import './assets/index.css'
import axiosClient from './lib/axios-client'
import { accessToken } from './utils/accessToken'

export default function App() {
  const navigate = useNavigate()

  const at = accessToken.value()

  

  axiosClient.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${accessToken.value()}`
      return config
    },
    function (err) {
      return Promise.reject(err)
    }
  )

  axiosClient.interceptors.response.use(
    function (response) {
      return response
    },
    async function (err) {
      const originalRequest = err.config

      if (err.response.status === 401 && !originalRequest._retry === true) {
        originalRequest._retry = true

        try {
          const { data } = await axiosClient.post<{ accessToken: string }>(
            '/auth/refresh-token'
          )
          const newAccessToken = data.accessToken
          accessToken.update(newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          axiosClient(originalRequest)
          return
        } catch (err) {
          navigate({
            to: '/log-in',
          })
        }
      }

      return Promise.reject(err)
    }
  )

  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}
