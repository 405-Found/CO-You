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
  Modal,
} from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Slider from '@mui/material/Slider'
import axios from 'axios'
import { getToken } from '../../lib/useAuth'

import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import Header from '../../components/Header'
import { CHARITIES, AUTH_TOKEN_KEY } from '../../lib/constants'

import AddIcon from '@mui/icons-material/Add'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined'

import BackButton from '../../components/BackButton'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import ActionModal from '../../lib/ActionModal'

const Leaderboard = ({ user, friends }) => {
  const router = useRouter()
  if (!user) router.push('/')
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false)
  const [friendEmail, setFriendEmail] = useState('')
  const [err, setErr] = useState('')
  const onAddFriendSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios
        .post(
          `/api/user/addFriend?token=${getToken()}&email=${friendEmail}`,
          undefined,
          {
            withCredentials: false,
          }
        )
        .then(() => {
          router.reload()
        })
    } catch {
      setErr('Invalid email')
    }
  }
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
          <Grid item xs={8} width="100%">
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
                    <TableCell
                      align="right"
                      className="table-head"
                      numeric="true"
                    >
                      <Box
                        style={{
                          textAlign: 'right',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Carbon Credits
                      </Box>
                    </TableCell>
                    <TableCell align="right" className="table-head">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {friends.map(({ name, email, carbonCredit }, i) => (
                    <FriendItem
                      router={router}
                      rank={`${i + 1}`}
                      name={name}
                      email={email}
                      credits={carbonCredit}
                      currentUser={user}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={1}>
            <ActionModal
              open={addFriendModalOpen}
              onClose={() => setAddFriendModalOpen(false)}
            >
              <Typography variant="h6" gutterBottom>
                Add Friend
              </Typography>
              <form onSubmit={onAddFriendSubmit}>
                {err && <Typography color="red">{err}</Typography>}
                <TextField
                  label="Friend's email"
                  value={friendEmail}
                  onChange={(event) => setFriendEmail(event.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Add Friend
                </Button>
              </form>
            </ActionModal>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="large"
              className="btn btn-primary"
              sx={{ minWidth: '200px', textAlign: 'center' }}
              onClick={() => setAddFriendModalOpen(true)}
            >
              Add friend
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

const FriendItem = (props) => {
  const isDeficit = props.credits < 0
  const currentUserDeficit = props.currentUser.carbonCredit < 0
  const [giftModalOpen, setGiftModalOpen] = useState(false)
  const [amt, _setAmt] = useState(0)
  const setAmt = (newAmt) => {
    _setAmt(Math.max(0, Math.min(props.currentUser.carbonCredit, newAmt)))
  }
  const pctAmt =
    props.currentUser.carbonCredit != 0
      ? 100 * (amt / props.currentUser.carbonCredit)
      : 0
  const setPctAmt = (newPct) =>
    setAmt((props.currentUser.carbonCredit * newPct) / 100)
  const isMe = props.email === props.currentUser.email

  const handleGift = async () => {
    if (!amt) return
    const res = await axios.post(
      `/api/user/giveGift?token=${getToken()}&friendEmail=${
        props.email
      }&amount=${amt}`,
      undefined,
      {
        requireCredentials: false,
      }
    )
    console.log(res.data)
    props.router.reload()
  }

  return (
    <>
      <ActionModal open={giftModalOpen} onClose={() => setGiftModalOpen(false)}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Gift Carbon Credits
        </Typography>
        <TextField
          value={amt}
          onChange={(event) => setAmt(parseFloat(event.target.value))}
          label="Amount"
          type="number"
          fullWidth
        />
        <Slider
          size="small"
          aria-label="pct-amt"
          step={25}
          marks={[
            { value: 0, label: '0%' },
            { value: 25, label: '25%' },
            { value: 50, label: '50%' },
            { value: 75, label: '75%' },
            { value: 100, label: '100%' },
          ]}
          onChange={(_, newVal) => setPctAmt(newVal)}
          value={pctAmt}
          getAriaValueText={(value) => `${value}%`}
          valueLabelDisplay="off"
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={!amt}
          onClick={() => handleGift()}
        >
          Transfer Credits
        </Button>
      </ActionModal>
      <TableRow key="1" sx={{ borderBottom: 0 }}>
        <TableCell component="th" scope="row">
          <Avatar sx={{ width: 36, height: 36 }}>#{props.rank}</Avatar>
        </TableCell>
        <TableCell>
          {props.name} {isMe && '(Me)'}
        </TableCell>
        <TableCell
          align="right"
          style={{
            color: props.credits <= 0 ? '#ff5252' : '#00c853',
            fontWeight: 700,
          }}
        >
          {props.credits}
          {!isMe && isDeficit && !currentUserDeficit ? (
            <Button
              size="small"
              color="success"
              startIcon={<Icon>volunteer_activism</Icon>}
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => {
                setAmt(
                  Math.min(
                    Math.abs(props.credits),
                    props.currentUser.carbonCredit
                  )
                )
                setGiftModalOpen(true)
              }}
            >
              Gift
            </Button>
          ) : null}
        </TableCell>
        <TableCell align="right">
          <ActionIconMenu email={props.email} isDeficit={isDeficit} />
        </TableCell>
      </TableRow>
    </>
  )
}
const ActionIconMenu = (props) => {
  const router = useRouter()
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
        <MenuItem onClick={() => router.push(`/profile?email=${props.email}`)}>
          <ListItemIcon>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText>View Profile</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { cookies } = context.req
  const token = cookies && cookies[AUTH_TOKEN_KEY]
  if (token) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/userToken?token=${token}`
    )
    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/friends?token=${token}`
    )
    console.log(res2.data)
    return { props: { user: res.data, friends: res2.data } }
  }
  return {
    props: {},
  }
}

export default Leaderboard
