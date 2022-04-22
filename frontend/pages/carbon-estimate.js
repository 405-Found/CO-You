import { Container, Typography, Icon, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import carbon2trees from '../lib/carbon2trees'

const CarbonEstimate = ({ estimate }) => {
  const router = useRouter()

  const onContinue = () => {
    router.push({
      pathname: '/set-goal',
      query: {
        topline: estimate,
      },
    })
  }

  const nTrees = carbon2trees(estimate * 365)

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
            {estimate}
          </Box>
          <Box as="span" sx={{ fontSize: 20 }}>
            kg CO<sup>2</sup> per day
          </Box>
        </Typography>
        <Typography variant="subtitle">
          That's the same amount of CO<sup>2</sup> that {nTrees.toFixed(2)}{' '}
          trees offset every year
        </Typography>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', mt: 2 }}
        >
          {[...Array(Math.floor(nTrees)).keys()].map((i) => (
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
  return {
    props: {
      estimate: context.query?.estimate || 0,
    },
  }
}

export default CarbonEstimate
