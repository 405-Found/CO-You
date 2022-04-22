import {
  Container,
  Typography,
  Icon,
  Button,
  Stack,
  Card,
  CardContent,
} from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import carbon2trees from '../lib/carbon2trees'
import ParkIcon from '@mui/icons-material/Park'

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
      <Box className="app-frame" sx={{}}>
        <Header />
        <Container className="app-container">
          <Box className="app-box">
            <Stack spacing={0}>
              <Typography variant="h4" className="page-subtitle" gutterBottom>
                Estimated daily emissions
              </Typography>
              <Typography variant="h4" className="page-title" color="#e53935">
                {estimate} kg
                <Typography className="page-subtitle-second">
                  Carbon dioxide per day
                </Typography>
              </Typography>

              <Card
                sx={{ minWidth: 275, color: '#00692c' }}
                className="card-primary"
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="subtitle">
                      It is the same amount of{' '}
                      <boldGreen>{nTrees.toFixed(2)}</boldGreen> trees offset
                      every day!
                    </Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(8, 1fr)',
                        mt: 2,
                      }}
                    >
                      {[...Array(Math.floor(nTrees)).keys()].map((i) => (
                        <ParkIcon key={i} color="#00c853" />
                      ))}
                    </Box>
                    <Button
                      className="btn-primary"
                      sx={{ maxWidth: '200px', textAlign: 'center' }}
                      onClick={onContinue}
                    >
                      Next
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
  return {
    props: {
      estimate: context.query?.estimate || 0,
    },
  }
}

export default CarbonEstimate
