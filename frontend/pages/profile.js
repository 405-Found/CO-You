import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Container,
  Icon,
  IconButton,
  Paper,
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
import stc from 'string-to-color'
import typeToColor from '../lib/typeToColor'

const Profile = ({ user }) => {
  const router = useRouter()
  useAuth(router)

  useEffect(() => {
    if (!user) router.push('/')
    console.log(pieData)
  }, [])

  const pieData = Object.entries(user?.currentStatus.shares || [])
    .map((data) => ({
      title: data[0],
      value: data[1].amount,
      color: typeToColor(data[0]),
      pct: data[1].percentage,
    }))
    .filter(({ pct }) => pct > 0.01)
  const totalCo2 = pieData.reduce((acc, { value }) => acc + value, 0)

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
          <Typography variant="h3" fontWeight={500} sx={{ my: 2, mb: 4 }}>
            {user?.email}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Icon>person_add</Icon>}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            Send Friend Request
          </Button>
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
        <Box flex={1} bgcolor="#81c784" pb={8}>
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
            <Paper
              sx={{
                maxWidth: 500,
                padding: 4,
                borderRadius: 4,
              }}
              elevation={1}
            >
              <Typography variant="h6" sx={{ fontSize: 24 }}>
                Carbon Footprint Snapshot
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.64)' }}
              >
                Overall emissions by transportation category.
              </Typography>
              <Box sx={{ position: 'relative', mt: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                  align="center"
                  fontFamily="monospace"
                >
                  {totalCo2} kg
                  <br />
                  CO<sup>2</sup>
                </Typography>
                <PieChart
                  data={pieData}
                  lineWidth={40}
                  segmentsStyle={{ transition: 'stroke .3s' }}
                  animate
                  label={({ dataIndex, dataEntry }) =>
                    `${pieData[dataIndex].title} ${Math.round(
                      dataEntry.percentage
                    )}%`
                  }
                  labelPosition={80}
                  labelStyle={{
                    fontSize: '4px',
                    fill: '#fff',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            </Paper>
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
