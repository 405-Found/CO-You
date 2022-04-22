import cookie from 'cookie-cutter'
import { useEffect } from 'react'
import { AUTH_TOKEN_KEY } from '../lib/constants'

export const getToken = () => cookie.get(AUTH_TOKEN_KEY)

const useAuth = (router) => {
  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push('/sign-up-role-select')
    }
  }, [])
}

export default useAuth
