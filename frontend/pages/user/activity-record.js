import { Button, Container, Icon } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { minWidth } from '@mui/system'
import Header from '../../components/Header'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Pause from '@mui/icons-material/Pause'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import FlightIcon from '@mui/icons-material/Flight'
import DoneIcon from '@mui/icons-material/Done'
import StopIcon from '@mui/icons-material/Stop'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { clearInterval } from 'timers'
import axios from 'axios'
import typeToIcon from '../../lib/typeToicon'
import typeToEmissionLevel from '../../lib/typeToEmissionLevel'
import typeToSpeed from '../../lib/typeToSpeed'
import { getToken } from '../../lib/useAuth'
import { useRouter } from 'next/router'

const activityRecord = ({ type }) => {
  const router = useRouter()
  const [startTime] = useState(new Date())
  const [secs, setSecs] = useState(0)
  let invl = null
  useEffect(() => {
    if (!invl)
      invl = setInterval(() => {
        setSecs((pSecs) => pSecs + 1)
      }, 1000)
  }, [])

  const getSeconds = `0${secs % 60}`.slice(-2)
  const minutes = `${Math.floor(secs / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)

  // function to guess the ~amount of carbon emissions per second of travel
  const secsToCo2 = (s) => s * 0.5

  const onEnd = async () => {
    const duration = (secs / 3600).toFixed(2)
    const distance = (typeToSpeed(type) * duration).toFixed(2)
    // TODO:
    const res = await axios.post(`/api/user/addActivity?token=${getToken()}`, {
      description: '...',
      activityItem: {
        type: type,
        distance,
        duration,
        start: startTime.toISOString(),
        end: new Date().toISOString(),
      },
    })
    console.log(res.data)
    router.push('/')
  }

  return (
    <Box className="app-frame" style={{ backgroundColor: '#4caf50' }}>
      <Header />
      <Container
        className="app-container"
        style={{ backgroundColor: '#4caf50' }}
      >
        <Box className="app-box">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <div className="activity-time">{`${getMinutes}:${getSeconds}`}</div>
            </Grid>
          </Grid>
          <Box className="activity-action-back">
            <Box>
              <Button
                className="activity-pause-button"
                variant="contained"
                component="span"
                style={{ color: '#4caf50', borderColor: '#4caf50' }}
                onClick={() => {
                  clearInterval(invl)
                  onEnd()
                }}
              >
                <Icon>stop_circle</Icon>
              </Button>
            </Box>

            <Stack spacing={1}>
              <Box className="card-green-solid activity-display-box">
                <Grid
                  container
                  spacing={2}
                  className="activity-display-box-item"
                >
                  <Grid item xs={1}>
                    <EnergySavingsLeafIcon />
                  </Grid>
                  <Grid item xs={7}>
                    Estimated carbon (kg)
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: 'right' }}>
                    {secsToCo2(secs).toFixed(2)}
                  </Grid>
                </Grid>
              </Box>
              <Box className="card-primary activity-display-box">
                <Grid
                  container
                  spacing={2}
                  className="activity-display-box-item"
                >
                  <Grid item xs={1}>
                    <Icon>{typeToIcon(type)}</Icon>
                  </Grid>
                  <Grid item xs={7}>
                    Vehicle
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: 'right' }}>
                    {type}
                  </Grid>
                </Grid>
              </Box>
              <Box className="card-yellow activity-display-box">
                <Grid
                  container
                  spacing={2}
                  className="activity-display-box-item"
                >
                  <Grid item xs={1}>
                    <Icon>co2</Icon>
                  </Grid>
                  <Grid item xs={7}>
                    Emission level
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: 'right' }}>
                    {typeToEmissionLevel(type)}
                  </Grid>
                </Grid>
              </Box>
              {/* <Box className="card-primary activity-display-box">
                <Grid
                  container
                  spacing={2}
                  className="activity-display-box-item"
                >
                  <Grid item xs={1}>
                    <FlightIcon />
                  </Grid>
                  <Grid item xs={7}>
                    Carbon balance
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: 'right' }}>
                    10%
                  </Grid>
                </Grid>
              </Box> */}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export async function getServerSideProps(context) {
  return {
    props: { type: context.query?.type || null },
  }
}

export default activityRecord
