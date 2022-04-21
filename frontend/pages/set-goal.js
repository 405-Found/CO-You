import { useState } from 'react'
import { Container, Icon, Slider, Stack, Typography } from '@mui/material'
import Header from '../components/Header'
import { DEFAULT_GOAL_PCT } from '../lib/constants'

const SetGoal = ({ topLine }) => {
  const [goalPct, setGoalPct] = useState(DEFAULT_GOAL_PCT)

  return (
    <>
      <Header showBackButton />
      <Container>
        <Typography variant="h4" sx={{ marginY: 2 }}>
          Let's work on decreasing your CO<sup>2</sup> emissions
        </Typography>
        <Typography>
          We estimate that you use {topLine} kg CO<sup>2</sup> every day
        </Typography>
        <Stack spacing={2} direction="row" sx={{ my: 2 }} alignItems="center">
          <Icon>mood_bad</Icon>
          <Slider
            aria-label="pct-goal"
            step={10}
            min={10}
            max={100}
            valueLabelDisplay="auto"
            marks
            value={goalPct}
            onChange={(_, newVal) => setGoalPct(newVal)}
            getAriaValueText={(value) => `${value}%`}
          />
          <Icon>mood</Icon>
        </Stack>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  console.log('???')
  console.log(context.query)
  return {
    props: {
      topLine: context.query['Top Line'],
    },
  }
}

export default SetGoal
