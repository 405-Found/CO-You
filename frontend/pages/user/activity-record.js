import { Button, Container, Icon } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Header from '../../components/Header'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import { useEffect, useState } from 'react'
import axios from 'axios'
import typeToIcon from '../../lib/typeToIcon'
import typeToEmissionLevel from '../../lib/typeToEmissionLevel'
import typeToSpeed from '../../lib/typeToSpeed'
import { getToken } from '../../lib/useAuth'
import { useRouter } from 'next/router'
import typeToDistCarbonConstant from '../../lib/typeToDistCarbonConstant'

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

  // function to guess the ~amount of carbon emissions per km of travel
  const distToCO2 = (d) => d * typeToDistCarbonConstant(type)
  // function to guess the ~amount of carbon emissions per second of travel
  const secsToCO2 = (s) => distToCO2(typeToSpeed(type) * s)

  const onEnd = async () => {
    const duration = secs / 3600
    const distance = typeToSpeed(type) * duration
    console.log(distance)
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
    router.push('/user')
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
                  // if (invl) clearInterval(invl)
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
                  <Grid item xs={6.5}>
                    Estimated emissions (kg)
                  </Grid>
                  <Grid item xs={2.5} style={{ textAlign: 'right' }}>
                    {secsToCO2(secs).toFixed(2)}
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
                  <Grid item xs={5}>
                    Vehicle
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
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
                  <Grid item xs={6}>
                    Emission level
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: 'right' }}>
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
