import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { minWidth } from '@mui/system'
import Header from '../components/Header'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useRouter } from 'next/router'
const signUpEmail = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const onSubmit = (event) => {
    event.preventDefault()
    router.push({ pathname: '/sign-up-name', query: { email } })
  }
  return (
    <Box className="app-frame" sx={{}}>
      <Header />
      <Container className="app-container">
        <Box className="app-box">
          <Stack spacing={2}>
            <Typography
              variant="h4"
              className="page-title"
              color="text.secondary"
              gutterBottom
            >
              What is your email address?
            </Typography>
            <Card sx={{ minWidth: 275 }} className="card-primary">
              <CardContent>
                <form onSubmit={onSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      placeholder="Please enter your email address"
                      className="app-input"
                      variant="filled"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                    />
                    <Button
                      type="submit"
                      className="btn-primary"
                      sx={{ maxWidth: '200px', textAlign: 'center' }}
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

export default signUpEmail
