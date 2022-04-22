import cookie from 'cookie-cutter'
import { useEffect } from 'react'
import { AUTH_TOKEN_KEY } from '../lib/constants'

const useAuth = (router) => {
  useEffect(() => {
    const token = cookie.get(AUTH_TOKEN_KEY)
    if (!token) {
      router.push('/sign-up-role-select')
    }
  }, [])
}

export default useAuth
