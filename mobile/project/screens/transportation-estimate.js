import { useState } from 'react'
import {
  Button,
  ListItemText,
  TextField,
  Typography,
  Stack,
  Card,
  CardContent,
} from '@mui/material'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import axios from 'axios'

import Header from '../components/Header'
import transportationTypes from '../lib/transportation-types'
import useAuth from '../lib/useAuth'

const TransportationType = ({ typeName, onChange, value }) => (
  <ListItem>
    <ListItemText>
      <Typography>{typeName}</Typography>
    </ListItemText>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'minmax(auto, 64px) auto',
        gridGap: 8,
        alignItems: 'center',
      }}
    >
      <TextField
        type="number"
        onChange={onChange(typeName)}
        value={value[typeName]}
      />
      <Typography variant="subtitle">hours</Typography>
    </Box>
  </ListItem>
)

const TransportationEstimate = () => {
  const router = useRouter()
  useAuth(router)

  const [hourData, setHourData] = useState(
    transportationTypes.reduce((a, v) => ({ ...a, [v]: '0' }), {})
  )

  const handleChange = (typeName) => (event) => {
    const newHourData = { ...hourData }
    newHourData[typeName] = event.target.value
    setHourData(newHourData)
  }

  const submitHourData = async () => {
    const postdata = []
    for (const [typeName, value] of Object.entries(hourData)) {
      postdata.push({ type: typeName, duration: value })
    }
    const res = await axios.post('/api/user/setDailyPlan', postdata, {
      withCredentials: false,
    })
    router.push({
      pathname: '/carbon-estimate',
      query: { estimate: res.data },
    })
  }

  return (
    <>
      <Box className="app-frame" sx={{}}>
        <Header />
        <Container className="app-container">
          <Box className="app-box">
            <Stack spacing={2}>
              <Typography
                variant="h4"
                className="page-title"
                color="text.secondary"
                gutterBottom
              >
                Set up your account
              </Typography>
              <Card sx={{ minWidth: 275 }} className="card-primary">
                <CardContent>
                  <Stack spacing={1}>
                    <Typography
                      variant="h6"
                      className="page-subtitle"
                      color="text.secondary"
                      gutterBottom
                    >
                      What transportation do you take everyday?
                    </Typography>
                    <List>
                      {transportationTypes.map((typeName) => (
                        <TransportationType
                          key={typeName}
                          typeName={typeName}
                          onChange={handleChange}
                          value={hourData}
                        />
                      ))}
                    </List>
                    <Button
                      className="btn-primary"
                      sx={{ maxWidth: '200px', textAlign: 'center' }}
                      onClick={submitHourData}
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

export default TransportationEstimate
