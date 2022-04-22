import { useState } from 'react'
import {
  Button,
  Container,
  Icon,
  Slider,
  Stack,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import Header from '../components/Header'
import { DEFAULT_GOAL_PCT } from '../lib/constants'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getToken } from '../lib/useAuth'

import carbon2trees from '../lib/carbon2trees'

const SetGoal = ({ topLine }) => {
  const router = useRouter()
  const [goalPct, setGoalPct] = useState(DEFAULT_GOAL_PCT)
  const creditsPerDay = (topLine * (goalPct / 100)).toFixed(2)
  const onClick = async () => {
    const res = await axios.post(
      `/api/user/setGoal?token=${getToken()}&goal=${creditsPerDay}`,
      {},
      {
        withCredentials: false,
      }
    )
    console.log(res.data)
    router.push('/user')
  }

  return (
    <>
      <Box className="app-frame" sx={{}}>
        <Header />
        <Container className="app-container">
          <Box className="app-box">
            <Stack spacing={0}>
              <Typography variant="h4" className="page-title" color="#e53935">
                Lets make some changes
              </Typography>

              <Card
                sx={{ minWidth: 275, color: '#00692c' }}
                className="card-primary"
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="subtitle" marginBottom="35px">
                      To what extent would you like to retain your current
                      lifestyle?
                    </Typography>
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ my: 2 }}
                      alignItems="center"
                    >
                      <Icon>mood</Icon>
                      <Slider
                        aria-label="pct-goal"
                        step={10}
                        min={10}
                        max={100}
                        marks
                        value={goalPct}
                        onChange={(_, newVal) => setGoalPct(newVal)}
                        getAriaValueText={(value) => `${value}%`}
                        valueLabelFormat={(value) => `${value}%`}
                        valueLabelDisplay="on"
                      />
                      <Icon>mood_bad</Icon>
                    </Stack>
                    <Typography variant="subtitle">
                      Emission reduced to <boldGreen>{creditsPerDay}</boldGreen>{' '}
                      kg
                    </Typography>
                    <Typography variant="subtitle">
                      Saving{' '}
                      <boldGreen>
                        {carbon2trees(
                          (topLine - creditsPerDay) * 365
                        ).toFixed()}
                      </boldGreen>{' '}
                      trees every day{' '}
                      <Icon>
                        {goalPct <= 90
                          ? goalPct <= 70
                            ? 'mood'
                            : 'sentiment_neutral'
                          : 'mood_bad'}
                      </Icon>
                    </Typography>

                    <Button
                      className="btn-primary"
                      sx={{ maxWidth: '200px', textAlign: 'center' }}
                      onClick={onClick}
                    >
                      Continue
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export async function getServerSideProps(context) {
  console.log('???')
  console.log(context.query)
  return {
    props: {
      topLine: context.query?.topline || '',
    },
  }
}

export default SetGoal
