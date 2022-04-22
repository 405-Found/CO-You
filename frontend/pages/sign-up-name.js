import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Header from '../components/Header'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import cookie from 'cookie-cutter'
import { AUTH_TOKEN_KEY } from '../lib/constants'

const signUpName = ({ email }) => {
  const router = useRouter()
  useEffect(() => {
    if (!email) router.push('/sign-up-email')
  }, [])

  const [uname, setUname] = useState('')
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(process.env)
    const res = await axios.post(
      `/api/user/register`,
      {
        email,
        name: uname,
        pwd,
      },
      {
        withCredentials: false,
      }
    )
    const { registered, responseInformation, token } = res.data
    if (registered && token) {
      cookie.set(AUTH_TOKEN_KEY, token)
      router.push('/transportation-estimate')
    } else {
      setErr(responseInformation)
    }
  }

  return (
    <Box className="app-frame" sx={{ backgroundColour: '#4caf50' }}>
      <Header />
      <Container className="app-container">
        <Box className="app-box">
          <Stack spacing={2}>
            {err ? (
              <Box>
                <Typography sx={{ fontFamily: 'monospace', color: 'red' }}>
                  {err}
                </Typography>
              </Box>
            ) : null}
            <Typography
              variant="h4"
              className="page-title"
              color="text.secondary"
              gutterBottom
            >
              Set up your account
            </Typography>
            <Card sx={{ minWidth: 275 }} className="card-primary">
              <CardContent>
                <form onSubmit={onSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      placeholder="Please enter a username"
                      className="app-input"
                      variant="filled"
                      value={uname}
                      onChange={(event) => setUname(event.target.value)}
                    />
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      placeholder="Please enter your password"
                      className="app-input"
                      variant="filled"
                      type="password"
                      value={[pwd]}
                      onChange={(event) => setPwd(event.target.value)}
                    />
                    <Button
                      className="btn-primary"
                      sx={{ maxWidth: '200px', textAlign: 'center' }}
                      type="submit"
                    >
                      Next
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export async function getServerSideProps(context) {
  console.log(context.query)
  return {
    props: {
      email: context.query?.email || '',
    },
  }
}

export default signUpName
