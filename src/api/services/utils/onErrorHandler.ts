import { AxiosError } from 'axios'

type ResData = {
  error: string
  message: string | string[]
  statusCode: number
}

type Props = {
  error: AxiosError
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>
}

export default function onErrorHandler({ error, setErrorMessage }: Props) {
  const data = error.response?.data as ResData
  if (setErrorMessage) {
    const message = data.message
    if (Array.isArray(message)) {
      setErrorMessage(message[0])
    } else if (typeof message === 'string') {
      setErrorMessage(message)
    }
  }
}
