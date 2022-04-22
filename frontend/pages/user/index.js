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
  Dialog,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  Card,
  Grid,
  IconButton,
} from '@mui/material'
import moment from 'moment'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import axios from 'axios'
import { useState } from 'react'
import Header from '../../components/Header'
import { AUTH_TOKEN_KEY, CHARITIES, VEHICLE_TYPES } from '../../lib/constants'
import typeToIcon from '../../lib/typeToIcon'
import ActionModal from '../../lib/ActionModal'
// React gauge
import { color } from 'd3-color'
import { interpolateRgb } from 'd3-interpolate'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LiquidFillGauge from 'react-liquid-gauge'

import AddIcon from '@mui/icons-material/Add'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import AssessmentIcon from '@mui/icons-material/Assessment'

const TYPE_TO_VERB = {
  Motorbike: 'Ride',
  Bus: 'Ride',
  Rail: 'Take a train',
  Car: 'Drive',
  Flight: 'Fly',
}

const VehicleTypeDialog = ({ router, open, setOpen }) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Select a vehicle type</DialogTitle>
      <List>
        {VEHICLE_TYPES.map((type) => (
          <ListItem
            button
            key={type}
            onClick={() =>
              router.push({
                pathname: '/user/activity-record',
                query: { type },
              })
            }
          >
            <ListItemAvatar>
              <ListItemIcon>
                <Icon>{typeToIcon(type)}</Icon>
              </ListItemIcon>
            </ListItemAvatar>
            <ListItemText primary={type} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

const Index = ({ user, activities }) => {
  const router = useRouter()
  if (!user) router.push('/sign-up-role-select')
  const [changeOrgModalOpen, setChangeOrgModalOpen] = useState(false)

  const [open, setOpen] = useState(false)
  const [balancePercentage, setBalancePercentage] = useState(30)
  const balance = parseFloat(user?.carbonCredit).toFixed(2)
  return (
    <>
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Header isFixed user={user} />

        <Container>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh', paddingTop: '30px' }}
          >
            <Grid item xs={5}>
              <Box className="home-circle-container">
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    style={{
                      position: 'absolute',
                      marginTop: '250px',
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => router.push('/charities')}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => router.push('/user/report')}
                    >
                      <AssessmentIcon />
                    </IconButton>
                  </Box>

                  <Box
                    style={{
                      position: 'absolute',
                      marginTop: '-100px',
                      marginLeft: '-210px',
                    }}
                  ></Box>
                  <Grid item xs={1} className="home-circle-subtitle">
                    Emission Balance
                  </Grid>
                  <Grid item xs={1}>
                    <Box className="home-circle-title">
                      {parseFloat(user?.carbonCredit).toFixed(2)} kg
                    </Box>
                  </Grid>
                  {balance < 0 ? (
                    <Grid item xs={1}>
                      Ask a friend to donate!
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>
              </Box>
              <Box
                className="home-circle-background"
                style={{
                  backgroundColor: balance > 0 ? '#b9f6ca' : '#ffebee',
                }}
              >
                <Gauge
                  value="50"
                  credit="30"
                  balance={parseFloat(user?.carbonCredit).toFixed(2)}
                  style={{
                    marginLeft: '-19px',
                    marginTop: '-19px',
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              className="home-activities"
              style={{
                overflowY: 'scroll',
                paddingBottom: '5px',
                height: '10vh',
                backgroundColor: 'rgba(255,255,255,1)',
                borderRadius: '30px 30px 0px 0px',
              }}
              justifyContent="center"
            >
              <Container>
                <Typography variant="overline">
                  {activities.length > 0
                    ? "Today's activities"
                    : 'No activity recorded!'}
                </Typography>
                <List>
                  {activities?.map(
                    (
                      {
                        activityItem: {
                          type,
                          subtype,
                          start,
                          end,
                          departurePos,
                          arrivalPos,
                          distance,
                          carbonAmount,
                        },
                      },
                      i
                    ) => (
                      <ListItem key={`Activity${i}`}>
                        <ListItemIcon>
                          <Icon>{typeToIcon(type)}</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${TYPE_TO_VERB[type]} ${(
                            distance * 1000
                          ).toFixed(0)}m ${subtype ? `on ${subtype}` : ''}`}
                          secondary={`${
                            start ? moment(start).format('HH:mma') : ''
                          } 
                          `}
                          secondaryTypographyProps={{ fontSize: 14 }}
                          sx={{
                            width: '130px',
                          }}
                        />
                        <Typography
                          color="#ff5252"
                          fontWeight={600}
                          fontSize={15}
                          textAlign="end"
                        >
                          -{`${carbonAmount.toFixed(2)} kg`}
                        </Typography>
                      </ListItem>
                    )
                  )}
                  <VehicleTypeDialog
                    router={router}
                    open={open}
                    setOpen={setOpen}
                  />
                </List>
              </Container>
            </Grid>
            <Grid isFixed>
              <Container>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                  <Grid
                    item
                    xs={12}
                    className="clickable"
                    onClick={() => setOpen(true)}
                  >
                    <Card
                      className="card-primary clickable"
                      style={{ width: '100%', height: '90px' }}
                    >
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                        style={{}}
                      >
                        <Grid item xs={6}>
                          <AddIcon sx={{ fontSize: 35, color: '#00c853' }} />
                        </Grid>

                        <Grid item xs={6}>
                          {' '}
                          Start activity
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={6} className="clickable">
                    <Card
                      className="card-yellow clickable"
                      style={{ width: '100%', height: '90px' }}
                      onClick={() => setChangeOrgModalOpen(true)}
                    >
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                        style={{}}
                      >
                        <Grid item xs={6}>
                          <AccessTimeIcon
                            sx={{ fontSize: 35, color: '#fbc02d' }}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          {' '}
                          Change charity
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
                        pathname: '/user/leaderboard',
                      })
                    }
                  >
                    <Card
                      className="card-red clickable"
                      style={{ width: '100%', height: '90px' }}
                    >
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                        style={{}}
                      >
                        <Grid item xs={6}>
                          <EmojiEventsIcon
                            sx={{ fontSize: 35, color: '#ff5252' }}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          Leaderboard
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ActionModal
        open={changeOrgModalOpen}
        onClose={() => {
          setChangeOrgModalOpen(false)
        }}
      >
        <Typography variant="h6" gutterBottom>
          Charity Settings
        </Typography>
        <Box
          mt={2}
          sx={{
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr auto 1fr',
            },
            alignItems: 'center',
          }}
        >
          <Box>
            <FormControl fullWidth color="success">
              <InputLabel id="charity-label" sx={{ bgcolor: '#FFF' }}>
                Charity Organisation
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
                The charity that companies who buys your credit will donate to
              </FormHelperText>
              <Button
                className="btn btn-primary"
                style={{ marginTop: '10px' }}
                onClick={() => setChangeOrgModalOpen(false)}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </Box>
      </ActionModal>
    </>
  )
}

const Gauge = ({ radius = 150, value, balance, credit, ...props }) => {
  const startColor = balance > 0 ? '#00c853' : '#ff5252' // cornflowerblue
  const endColor = balance > 0 ? '#00c853' : '#ff5252' // crimson
  const interpolate = interpolateRgb(startColor, endColor)
  const fillColor = interpolate(value / 100)
  const gradientStops = [
    {
      key: '0%',
      stopColor: interpolateRgb(startColor, endColor),
      stopOpacity: 1,
      offset: '0%',
    },
    {
      key: '50%',
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: '50%',
    },
    {
      key: '100%',
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: '100%',
    },
  ]

  return (
    <LiquidFillGauge
      {...props}
      width={radius * 2}
      height={radius * 2}
      value={value}
      percent="%"
      textSize={1}
      textOffsetX={0}
      textOffsetY={0}
      textRenderer={({ value, width, height, textSize, percent }) => {
        value = Math.round(value)
        const radius = Math.min(height / 2, width / 2)
        const textPixels = (textSize * radius) / 2
        const valueStyle = {
          fontSize: textPixels,
        }
        const percentStyle = {
          fontSize: textPixels * 0.6,
        }

        return <tspan></tspan>
      }}
      riseAnimation
      waveAnimation
      waveFrequency={2}
      waveAmplitude={1}
      gradient
      circleStyle={{
        fill: 'white',
      }}
      waveStyle={{
        fill: fillColor,
      }}
      textStyle={{
        fill: color('#444').toString(),
        fontFamily: 'Arial',
      }}
      waveTextStyle={{
        fill: color('#fff').toString(),
        fontFamily: 'Arial',
      }}
    />
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/currentActivities?token=${token}`
    )
    console.log(res2.data)
    return {
      props: {
        user: res.data || null,
        activities: res2.data || [],
      },
    }
  }
  return {
    props: {
      user: null,
      activities: [],
    },
  }
}

export default Index
