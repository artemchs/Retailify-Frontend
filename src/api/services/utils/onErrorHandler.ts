import { AxiosError } from 'axios'

type BadReqResponse = {
  error: string
  message: string | string[]
  statusCode: number
}

type Props = {
  error: AxiosError
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>
}

export default function onErrorHandler({ error, setErrorMessage }: Props) {
  if (error.response?.status === 400) {
    const data = error.response.data as BadReqResponse
    if (setErrorMessage) {
      const message = data.message
      if (Array.isArray(message)) {
        setErrorMessage(message[0])
      } else if (typeof message === 'string') {
        setErrorMessage(message)
      }
    }
  } else {
    console.error(error)
  }
}
