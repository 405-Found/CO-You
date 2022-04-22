import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Icon,
  ListItemIcon,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
} from '@mui/material'
import cookie from 'cookie-cutter'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import axios from 'axios'
import Header from '../components/Header'
import { AUTH_TOKEN_KEY, CHARITIES } from '../lib/constants'

const TODAYS_ACTIVITIES = [
  {
    type: 'CAR',
    subtype: 'diesel',
    distance: 50,
    time: '14:02 to 16:01',
    credits: -1,
  },
  {
    type: 'PLANE',
    distance: 1000,
    time: '07:03 to 09:04',
    credits: -10,
    from: 'MEL',
    to: 'LAX',
  },
]

const TYPE_TO_VERB = {
  CAR: 'Drive',
  PLANE: 'Fly',
}

const Index = ({ user }) => {
  const router = useRouter()
  if (!user) router.push('/sign-up-role-select')

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isFixed isTransparent />
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        <Box
          sx={{ backgroundColor: '#81c784' }}
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
              You're hitting your targets! :D
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: 80,
                color: '#FFF',
                lineHeight: 1,
              }}
            >
              {parseFloat(user.carbonCredit).toFixed(2)}
            </Typography>
            <Typography
              color="#FFF"
              variant="h6"
              fontFamily="monospace"
              fontSize={18}
            >
              carbon credits owned
            </Typography>
          </Container>
        </Box>
        <Wave
          fill="#81c784"
          paused={false}
          options={{
            height: 80,
            amplitude: 20,
            speed: 0.15,
            points: 3,
          }}
          style={{ transform: 'rotate(180deg)', marginBottom: -48 }}
        />
      </Box>
      <Container>
        <Typography variant="overline">Today's activities</Typography>
        <List>
          {TODAYS_ACTIVITIES.map(
            ({ type, distance, time, credits, subtype, from, to }, i) => (
              <ListItemButton key={`Activity${i}`}>
                <ListItemIcon>
                  <Icon>
                    {(() => {
                      switch (type) {
                        case 'CAR':
                          return 'directions_car'
                        case 'PLANE':
                          return 'flight'
                        default:
                          return ''
                      }
                    })()}
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary={`${TYPE_TO_VERB[type]} ${distance}km ${
                    subtype ? `on ${subtype}` : ''
                  }`}
                  secondary={`${time} ${from ? `from ${from}` : ''} ${
                    to ? `to ${to}` : ''
                  }`}
                  secondaryTypographyProps={{ fontSize: 14 }}
                />
                <Typography
                  fontFamily="monospace"
                  color="#c62828"
                  fontWeight={600}
                  fontSize={15}
                  textAlign="end"
                >
                  {`${credits.toFixed(2)} pts`}
                </Typography>
              </ListItemButton>
            )
          )}
          <ListItemButton onClick={() => router.push('/user/activity-record')}>
            <ListItemIcon>
              <Icon>add</Icon>
            </ListItemIcon>
            <ListItemText>Start recording</ListItemText>
          </ListItemButton>
        </List>
        <Box
          mt={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="overline">My Charity</Typography>
            <FormControl fullWidth>
              <InputLabel id="charity-label" sx={{ bgcolor: '#FFF' }}>
                Charity
              </InputLabel>
              <Select
                labelId="charity-label"
                id="charity-select"
                defaultValue={CHARITIES[0].name}
              >
                {CHARITIES.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                The charity your affiliated company will donate to
              </FormHelperText>
            </FormControl>
          </Box>
          <Divider>OR</Divider>
          <Box>
            <Button
              variant="contained"
              onClick={() => router.push('/charities')}
            >
              Donate
            </Button>{' '}
            to earn credits
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { cookies } = context.req
  const token = cookies && cookies[AUTH_TOKEN_KEY]
  if (token) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/userToken?token=${token}`
    )
    return {
      props: {
        user: res.data || null,
      },
    }
  }
  return {
    props: {
      user: null,
    },
  }
}

export default Index
