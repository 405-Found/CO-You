import cookie from 'cookie-cutter'
import { AUTH_TOKEN_KEY } from './constants'

const useAuth = () => {
  cookie.get(AUTH_TOKEN_KEY)
}

export default useAuth
