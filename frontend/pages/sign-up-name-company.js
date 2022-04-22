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
const signUpNameCompany = () => (
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
            What is the name of your organisation?
          </Typography>
          <Card sx={{ minWidth: 275 }} className="card-primary">
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  placeholder="Please enter the name"
                  className="app-input"
                  variant="filled"
                />
                <Button
                  className="btn-primary"
                  sx={{ maxWidth: '200px', textAlign: 'center' }}
                >
                  Next
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  </Box>
)

export default signUpNameCompany
