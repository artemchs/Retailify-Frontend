import { AccessTokenData } from '@/types/AccessTokenData'
import { accessToken } from './accessToken'
import { jwtDecode } from 'jwt-decode'

export default function setContextUser(context: { user?: AccessTokenData }) {
  const accessTokenValue = accessToken.value()
  if (accessTokenValue) {
    const decoded = jwtDecode(accessTokenValue) as AccessTokenData
    context.user = decoded
  }
}
