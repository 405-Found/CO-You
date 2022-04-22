import {
  AppBar,
  Avatar,
  Badge,
  Container,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../lib/useAuth'
import { Box } from '@mui/system'
import Wave from 'react-wavify'
import { PieChart } from 'react-minimal-pie-chart'

const CHART_DATA = [
  { title: 'Flight', value: 10, color: 'rgba(255,0,0,0.5)' },
  { title: 'Car', value: 15, color: 'rgba(0,255,0,0.5)' },
  { title: 'Motorbike', value: 20, color: 'rgba(0,0,255,0.5)' },
]

const Profile = ({ user }) => {
  const router = useRouter()
  useAuth(router)

  useEffect(() => {
    if (!user) router.push('/')
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar
        color="transparent"
        variant="outlined"
        elevation={0}
        position="fixed"
      >
        <Toolbar>
          <Container>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => router.push('/')}>
                <Icon>close</Icon>
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box display="flex" alignItems="flex-end">
        <Container sx={{ py: 4 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#44b700',
                color: '#44b700',
                boxShadow: '0 0 0 2px #fff',
                width: 20,
                height: 20,
                borderRadius: '50%',
                mr: -1,
                mb: -1,
                zIndex: 9009,
                '&::after': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  animation: 'ripple 1.2s infinite ease-in-out',
                  border: '1px solid currentColor',
                  content: '""',
                },
              },
              '@keyframes ripple': {
                '0%': {
                  transform: 'scale(.8)',
                  opacity: 1,
                },
                '100%': {
                  transform: 'scale(2.4)',
                  opacity: 0,
                },
              },
            }}
          >
            <Avatar
              variant="rounded"
              src="https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg"
              sx={{ width: 100, height: 100, zIndex: 9000 }}
            />
          </Badge>
          <Typography variant="h3" fontWeight={500} sx={{ my: 2 }}>
            {user?.email}
          </Typography>
        </Container>
      </Box>
      <Box flex={1} display="flex" flexDirection="column">
        <Wave
          fill="#81c784"
          paused={false}
          options={{
            height: 40,
            amplitude: 20,
            speed: 0.15,
            points: 3,
          }}
          style={{ marginBottom: -20 }}
        />
        <Box flex={1} bgcolor="#81c784">
          <Container
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 1,
            }}
          >
            <Box>
              <Typography variant="overline" color="#fff" fontSize={14}>
                {user?.email}'s Carbon Credits
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 80,
                  color: '#FFF',
                  lineHeight: 1,
                }}
              >
                {parseFloat(user?.carbonCredit, 2).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 500, maxHeight: 500 }}>
              <PieChart
                data={CHART_DATA}
                lineWidth={60}
                segmentsStyle={{ transition: 'stroke .3s' }}
                animate
                label={({ dataIndex, dataEntry }) =>
                  `${CHART_DATA[dataIndex].title} ${Math.round(
                    dataEntry.percentage
                  )}%`
                }
                labelPosition={70}
                labelStyle={{
                  fontSize: '5px',
                  fill: '#fff',
                  pointerEvents: 'none',
                }}
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { email } = context.query
  if (email) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user?email=${email}`
    )
    return {
      props: {
        user: res.data || null,
      },
    }
  }
  return {
    props: {},
  }
}

export default Profile
