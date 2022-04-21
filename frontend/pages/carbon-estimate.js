import { Container, Typography, Icon, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Header from '../components/Header'

const CarbonEstimate = () => {
  const router = useRouter()

  const N_TREES = 10
  const AMT_CARBON = 13.8

  const onContinue = () => {
    router.push({
      pathname: '/set-goal',
      query: {
        topline: AMT_CARBON,
      },
    })
  }

  return (
    <>
      <Header showBackButton />
      <Container>
        <Typography variant="h4" sx={{ marginY: 2 }}>
          Estimated daily emissions
        </Typography>
        <Typography>
          <Box
            as="span"
            sx={{ fontSize: 80, fontFamily: 'monospace', marginRight: 2 }}
          >
            {AMT_CARBON}
          </Box>
          <Box as="span" sx={{ fontSize: 20 }}>
            kg CO<sup>2</sup> per day
          </Box>
        </Typography>
        <Typography variant="subtitle">
          That's the equivalent cutting down {N_TREES} trees every year
        </Typography>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', mt: 2 }}
        >
          {[...Array(N_TREES).keys()].map((i) => (
            <Icon key={i}>park</Icon>
          ))}
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onContinue}
        >
          Continue
        </Button>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  console.log(context.query)
  return {
    props: {},
  }
}

export default CarbonEstimate
