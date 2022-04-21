import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Icon,
  ListItemIcon,
  Typography,
  Button,
} from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import Header from '../components/Header'

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

const Index = () => {
  const router = useRouter()
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
              +12.8
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
            amplitude: 10,
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
        <Box mt={2}>
          <Typography variant="overline">Donate to Charity</Typography>
          <Box
            display="grid"
            gridTemplateColumns="auto 1fr"
            gap={1}
            alignItems="center"
          >
            <Button variant="contained">Donate</Button>
            <Typography variant="body2">to get more carbon credits</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Index
