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
import React from 'react'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'

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

const Leaderboard = () => {
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
            <Grid item xs={8}>
              <TableContainer
                style={{
                  maxHeight: '350px',
                  overflowY: 'scroll',
                  scrollBehaviour: 'smooth',
                }}
              >
                <Table sx={{}} aria-label="simple table">
                  <TableHead>
                    <TableRow key="1" sx={{ borderBottom: 0 }}>
                      <TableCell className="table-head">Rank</TableCell>
                      <TableCell className="table-head">Name</TableCell>
                      <TableCell align="right" className="table-head">
                        <Box
                          style={{
                            textAlign: 'right',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Emission save
                        </Box>
                      </TableCell>
                      <TableCell align="right" className="table-head">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FriendItem rank="1" name="Kevin" emission="300" />
                    <FriendItem rank="1" name="Riley" emission="500" />
                    <FriendItem rank="1" name="Kevin" emission="300" />
                    <FriendItem rank="1" name="Kevin" emission="300" />
                    <FriendItem rank="1" name="Kevin" emission="300" />
                    <FriendItem rank="1" name="Kevin" emission="-30" />
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="large"
                className="btn btn-primary"
                sx={{ minWidth: '200px', textAlign: 'center' }}
              >
                Add friend
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const FriendItem = (props) => {
  const options = ['Profile', 'Donate credit', 'Ask for donation']
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <TableRow key="1" sx={{ borderBottom: 0 }}>
        <TableCell component="th" scope="row">
          <Avatar>#{props.rank}</Avatar>
        </TableCell>
        <TableCell>{props.name}</TableCell>
        <TableCell
          align="right"
          style={{
            color: props.emission <= 0 ? '#ff5252' : '#00c853',
            fontWeight: 700,
          }}
        >
          {props.emission}kg
        </TableCell>
        <TableCell align="right">
          <ActionIconMenu email={props.email} isDeficit={props.emission <= 0} />
        </TableCell>
      </TableRow>
    </>
  )
}
const ActionIconMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        <MenuItem>Profile</MenuItem>
        {props.isDeficit ? (
          <MenuItem>Donate credit</MenuItem>
        ) : (
          <MenuItem>Ask for donation</MenuItem>
        )}
      </Menu>
    </div>
  )
}
export default Leaderboard
