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
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material'
import axios from 'axios'

import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import Header from '../../components/Header'
import { AUTH_TOKEN_KEY, CHARITIES } from '../../lib/constants'
import AddIcon from '@mui/icons-material/Add'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined'

import BackButton from '../../components/BackButton'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
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

const dailyReport = ({ user }) => {
  const router = useRouter()
  return (
    <>
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
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
                fontWeight="bold"
                gutterBottom
                fontSize={30}
              >
                Congratulations!
              </Typography>
              <br />
              <Typography color="#FFF" variant="h6" fontSize={18}>
                You have saved
              </Typography>
              <Typography
                sx={{
                  fontSize: 60,
                  color: '#FFF',
                  fontWeight: '700',
                  marginBottom: '5px',
                  lineHeight: 1,
                }}
              >
                {user?.todayGoal?.curStatus}kg
              </Typography>
              <Typography color="#FFF" variant="h6" fontSize={18}>
                CO2 emissions so far today!
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
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            style={{ height: '70vh' }}
          >
            <Grid item xs={1}>
              <div className="page-title">
                <div className="page-title">
                  <Box style={{ position: 'absolute', left: '5%' }}>
                    <BackButton />
                  </Box>
                  <Box>These companies bought your emissions</Box>
                </div>
              </div>
            </Grid>

            <Grid item sx={11}>
              <List style={{}}>
                <DonationHistoryItem
                  companyname="Google"
                  orgname="SaveTheTrees"
                  amount="10"
                />
                <DonationHistoryItem
                  companyname="Amazon"
                  orgname="SaveTheTrees"
                  amount="10"
                />
                <DonationHistoryItem
                  companyname="Microsoft"
                  orgname="SaveTheTrees"
                  amount="20"
                />
              </List>
            </Grid>
            <Grid item sx={1}>
              <Button
                className="btn btn-primary"
                onClick={() => router.push('/profile?email=bigsoupz@gmail.zzz')}
              >
                Analyse my activities
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const DonationHistoryItem = (props) => {
  return (
    <ListItem
      secondaryAction={<Box edge="end">${props.amount}</Box>}
      sx={{ width: '340px' }}
    >
      <ListItemAvatar>
        <Avatar>
          <AttachMoneyOutlinedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.companyname}
        secondary={<>To {props.orgname}</>}
      />
    </ListItem>
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

export default dailyReport
