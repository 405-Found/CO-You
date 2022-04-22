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
  IconButton,
  Card,
  CardContent,
  Stack,
} from '@mui/material'

import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

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
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
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
        <Header isFixed isTransparent />
        <Box
          sx={{
            display: 'grid',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#00c853',
              paddingTop: '80px',
              textAlign: 'center',
            }}
            height={140}
            alignItems="flex-end"
          >
            <Typography
              variant="overline"
              color="#FFF"
              margin
              fontWeight="bold"
              gutterBottom
              fontSize={30}
            >
              Leaderboard
            </Typography>
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
                  <Box>Friends</Box>
                </div>
              </div>
            </Grid>
            <Grid item xs={7}>
              <List
                style={{
                  maxHeight: '300px',
                  overflowY: 'scroll',
                  scrollBehaviour: 'smooth',
                }}
              >
                <PurchaseHistoryItem place="1" credit="23" name="Kevin" />
                <PurchaseHistoryItem />
                <PurchaseHistoryItem />
                <PurchaseHistoryItem />
                <PurchaseHistoryItem />
                <PurchaseHistoryItem />
              </List>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                startIcon={<ArrowDownwardOutlinedIcon />}
                size="large"
                className="btn btn-primary"
                sx={{ minWidth: '200px', textAlign: 'center' }}
              >
                My profile
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const PurchaseHistoryItem = (props) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <Box
            edge="end"
            xs={{
              color: '#00c853',
            }}
          >
            {props.credit} g
          </Box>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <MoreVertOutlinedIcon />
          </IconButton>
        </>
      }
      sx={{ width: '350px' }}
    >
      <ListItemAvatar>
        <Avatar>#{props.place}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.name} />
    </ListItem>
  )
}

const BasicTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default BuyCredit
