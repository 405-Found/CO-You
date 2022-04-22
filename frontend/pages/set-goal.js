import { useState } from 'react'
import {
  Button,
  Container,
  Icon,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import Header from '../components/Header'
import { DEFAULT_GOAL_PCT } from '../lib/constants'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getToken } from '../lib/useAuth'

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
    router.push('/')
  }

  return (
    <>
      <Header showBackButton />
      <Container>
        <Typography variant="h4" sx={{ marginY: 2 }}>
          Let's work on decreasing your CO<sup>2</sup> emissions
        </Typography>
        <Typography>
          We estimate that you currently emit{' '}
          <Box as="span" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
            {topLine}
          </Box>{' '}
          kg CO<sup>2</sup> every day. What percentage of your current daily CO
          <sup>2</sup> emissions is your new target?
        </Typography>
        <Stack spacing={2} direction="row" sx={{ my: 2 }} alignItems="center">
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
            valueLabelDisplay="on"
          />
          <Icon>mood_bad</Icon>
        </Stack>
        <Typography>
          So, you will get
          <Box as="span" sx={{ fontFamily: 'monospace', fontSize: 40, mx: 1 }}>
            {creditsPerDay}
          </Box>
          additional carbon credits every day, where 1 carbon credit is
          equivalent to 1 kg of CO<sup>2</sup>.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          className="btn-primary"
          onClick={onClick}
        >
          Sounds good!
        </Button>
      </Container>
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
