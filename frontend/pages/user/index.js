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
  Grid,
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

// React gauge
import { color } from 'd3-color'
import { interpolateRgb } from 'd3-interpolate'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LiquidFillGauge from 'react-liquid-gauge'

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

  const [open, setOpen] = useState(false)
  const [balancePercentage, setBalancePercentage] = useState(30)

  return (
    <>
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Header isFixed />

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
                  <Grid item xs={1} className="home-circle-subtitle">
                    Balance
                  </Grid>
                  <Grid item xs={1}>
                    <Box className="home-circle-title">300kg</Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="home-circle-background">
                <Gauge
                  value="10"
                  credit="30"
                  style={{
                    marginLeft: '-19px',
                    marginTop: '-19px',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Container>
                <Typography variant="overline">Today's activities</Typography>
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
                          primary={`${TYPE_TO_VERB[type]} ${distance}km ${
                            subtype ? `on ${subtype}` : ''
                          }`}
                          secondary={`${
                            start ? moment(start).format('HH:mma') : ''
                          } ${
                            end ? ` - ${moment(end).format('HH:mma')}` : ''
                          } ${departurePos ? `from ${departurePos}` : ''} ${
                            arrivalPos ? `to ${arrivalPos}` : ''
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
                          -{`${carbonAmount.toFixed(2)} pts`}
                        </Typography>
                      </ListItem>
                    )
                  )}
                  <VehicleTypeDialog
                    router={router}
                    open={open}
                    setOpen={setOpen}
                  />
                  <ListItemButton onClick={() => setOpen(true)}>
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const Gauge = ({ radius = 150, value, credit, ...props }) => {
  const startColor = '#00c853' // cornflowerblue
  const endColor = '#00c853' // crimson
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
