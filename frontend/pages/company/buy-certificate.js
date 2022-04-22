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

import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import Header from '../../components/Header'
import { CHARITIES } from '../../lib/constants'
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

const BuyCredit = () => {
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
            sx={{ backgroundColor: '#00c853', paddingLeft: '20px' }}
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
                Proof of balance
              </Typography>
              <br />
              <Typography color="#FFF" fontSize={18} variant="h6">
                [Company name] has
              </Typography>
              <Typography
                sx={{
                  fontSize: 60,
                  color: '#FFF',
                  lineHeight: 1,
                }}
              >
                12.8 KG
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
                  <Box>Donation History</Box>
                </div>
              </div>
            </Grid>

            <Grid item sx={11}>
              <List style={{}}>
                <DonationHistoryItem />
                <DonationHistoryItem />
                <DonationHistoryItem />
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const DonationHistoryItem = () => {
  return (
    <ListItem
      secondaryAction={<Box edge="end">$30</Box>}
      sx={{ width: '340px' }}
    >
      <ListItemAvatar>
        <Avatar>
          <AttachMoneyOutlinedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Charity name" secondary="4 Oct 2022" />
    </ListItem>
  )
}
export default BuyCredit
