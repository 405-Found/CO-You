import {
  Container,
  List,
  ListItemText,
  Typography,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  Grid,
} from '@mui/material'

import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'
import Header from '../../components/Header'
import AddIcon from '@mui/icons-material/Add'

import BackButton from '../../components/BackButton'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'

const BuyCredit = () => {
  const router = useRouter()
  return (
    <>
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Header isFixed isTransparent />
        <Box
          sx={{
            display: 'grid',
          }}
        >
          <Box
            sx={{ backgroundColor: '#00c853' }}
            height={240}
            display="flex"
            alignItems="flex-end"
          >
            <Container>
              <Typography
                variant="overline"
                color="#FFF"
                gutterBottom
                fontSize={14}
              >
                Your company has
              </Typography>
              <Typography
                sx={{
                  fontSize: 80,
                  color: '#FFF',
                  lineHeight: 1,
                }}
              >
                22.8 kg
              </Typography>
              <Typography color="#FFF" variant="h6" fontSize={18}>
                carbon credits
              </Typography>
            </Container>
          </Box>
          <Wave
            fill="#00c853"
            paused={false}
            options={{
              height: 80,
              amplitude: 20,
              speed: 0.15,
              points: 3,
            }}
            style={{
              transform: 'rotate(180deg)',
              marginBottom: -50,
              marginTop: '-2px',
            }}
          />
        </Box>
        <Container>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            style={{ height: '70vh' }}
          >
            <Grid item xs={1}>
              <div className="page-title">
                <div className="page-title">
                  <Box style={{ position: 'absolute', left: '5%' }}>
                    <BackButton />
                  </Box>
                  <Box>Purchase History</Box>
                </div>
              </div>
            </Grid>
            <Grid item xs={6.5}>
              <List
                style={{
                  maxHeight: '300px',
                  overflowY: 'scroll',
                  scrollBehaviour: 'smooth',
                }}
              >
                <PurchaseHistoryItem />
              </List>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                startIcon={<ArrowDownwardOutlinedIcon />}
                size="large"
                className="btn btn-primary"
                sx={{ minWidth: '200px', textAlign: 'center' }}
                onClick={() =>
                  router.push({
                    pathname: '/company/buy-certificate',
                  })
                }
              >
                Download Certificate
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const PurchaseHistoryItem = () => {
  return (
    <ListItem
      secondaryAction={<Box edge="end">$10</Box>}
      sx={{ width: '300px' }}
    >
      <ListItemAvatar>
        <Avatar>
          <AddIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Bought 10kg" secondary="24 Apr 2022" />
    </ListItem>
  )
}
export default BuyCredit
