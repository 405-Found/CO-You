import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BackButton from './BackButton'

export default function Header({ showBackButton }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#F8F8F8' }}
        variant="outlined"
        elevation={0}
      >
        <Toolbar>
          {showBackButton ? <BackButton /> : null}
          <Typography variant="h4" color="blue">
            CarbonIO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button color="primary">Login</Button>
            <Button color="primary">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

Header.defaultProps = {
  showBackButton: false,
}
