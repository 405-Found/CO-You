import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
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
import WorkIcon from '@mui/icons-material/Work'
import SendIcon from '@mui/icons-material/Send'

import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
const activityRecord = () => (
  <Box className="app-frame">
    <Header />
    <Container className="app-container">
      <Box className="app-box" style={{ textAlign: 'center' }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box item xs={6}>
            You have saved
          </Box>
          <Box style={{ fontSize: '40px' }} item xs={6}>
            400kg <Box style={{ fontSize: '16' }}></Box>
          </Box>
          <Box item xs={10}>
            Carbon dioxide
          </Box>
          <Box item xs={6}>
            Equivalent to
          </Box>
          <Box style={{ fontSize: '40px' }} item xs={6}>
            3 trees <Box style={{ fontSize: '16' }}></Box>
          </Box>
          <Box item xs={10}>
            reduced today
          </Box>
          <Divider variant="inset" component="Grid" />
          <Box item xs={6}>
            Your savings are bought by
          </Box>
          <Box item xs={6}>
            <CompanyList />
          </Box>
          <Box item>
            <Button variant="contained" endIcon={<SendIcon />}>
              Share to friends
            </Button>
          </Box>
        </Grid>
      </Box>
    </Container>
  </Box>
)

const CompanyList = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary="[Company name]"
          secondary={
            <>
              <React.Fragment>
                {'Bought '}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  300kg
                </Typography>
              </React.Fragment>
              <br />
              <React.Fragment>
                {'Donated '}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  $Amount
                </Typography>
                {' to [Organisation name]'}
              </React.Fragment>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  )
}

export default activityRecord
