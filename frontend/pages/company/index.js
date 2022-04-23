import { Container, Typography, Grid, Card } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import AddIcon from '@mui/icons-material/Add'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import Header from '../../components/Header'

const Index = () => {
  const router = useRouter()
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isFixed isTransparent />
      <Box
        sx={{
          display: 'grid',
        }}
      >
        <Box
          sx={{ backgroundColor: '#00c853' }}
          height={240}
          display="flex"
          alignItems="flex-end"
        >
          <Container>
            <Typography
              variant="overline"
              color="#FFF"
              gutterBottom
              fontSize={14}
            >
              Your company has
            </Typography>
            <Typography
              sx={{
                fontSize: 80,
                color: '#FFF',
                lineHeight: 1,
              }}
            >
              12.8 kg
            </Typography>
            <Typography color="#FFF" variant="h6" fontSize={18}>
              carbon credits
            </Typography>
          </Container>
        </Box>
        <Wave
          fill="#00c853"
          paused={false}
          options={{
            height: 80,
            amplitude: 20,
            speed: 0.15,
            points: 3,
          }}
          style={{
            transform: 'rotate(180deg)',
            marginBottom: -50,
            marginTop: '-2px',
          }}
        />
      </Box>
      <Container>
        <Grid container spacing={2} style={{ textAlign: 'center' }}>
          <Grid
            item
            xs={6}
            className="clickable"
            onClick={() =>
              router.push({
                pathname: '/company/buy-credit',
              })
            }
          >
            <Card
              className="card-primary clickable"
              style={{ width: '100%', height: '100px' }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                style={{
                  marginLeft: '10px',
                  marginTop: '2px',
                }}
              >
                <Grid item xs={6}>
                  <AddIcon sx={{ fontSize: 35, color: '#00c853' }} />
                </Grid>

                <Grid item xs={6}>
                  {' '}
                  Buy Credit
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
            className="clickable"
            onClick={() =>
              router.push({
                pathname: '/company/buy-history',
              })
            }
          >
            <Card
              className="card-yellow clickable"
              style={{ width: '100%', height: '100px' }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                style={{
                  marginLeft: '10px',
                  marginTop: '2px',
                }}
              >
                <Grid item xs={6}>
                  <AccessTimeIcon sx={{ fontSize: 35, color: '#fbc02d' }} />
                </Grid>

                <Grid item xs={6}>
                  {' '}
                  Purchase history
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid
            item
            xs={6}
            className="clickable"
            onClick={() =>
              router.push({
                pathname: '/company/buy-certificate',
              })
            }
          >
            <Card
              className="card-red clickable"
              style={{ width: '100%', height: '100px' }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                style={{
                  marginLeft: '10px',
                  marginTop: '2px',
                }}
              >
                <Grid item xs={6}>
                  <EmojiEventsIcon sx={{ fontSize: 35, color: '#ff5252' }} />
                </Grid>

                <Grid item xs={6}>
                  {' '}
                  Certificate
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
            className="clickable"
            onClick={() =>
              router.push({
                pathname: '/charities',
              })
            }
          >
            <Card
              className="card-blue clickable"
              style={{ width: '100%', height: '100px' }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                style={{
                  marginLeft: '10px',
                  marginTop: '2px',
                }}
              >
                <Grid item xs={6}>
                  <InfoOutlinedIcon sx={{ fontSize: 35, color: '#1976d2' }} />
                </Grid>

                <Grid item xs={6}>
                  {' '}
                  Charity Info
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Index
