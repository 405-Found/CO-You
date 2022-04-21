import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BackButton from './BackButton'

export default function Header({ showBackButton, isFixed, isTransparent }) {
  return (
    <AppBar
      position={isFixed ? 'fixed' : 'static'}
      {...(!isTransparent && { sx: { backgroundColor: '#F8F8F8' } })}
      variant="outlined"
      elevation={0}
      color="transparent"
    >
      <Toolbar>
        {showBackButton ? <BackButton /> : null}
        <Typography
          variant="h4"
          sx={{ ...(isTransparent && { color: '#FFF' }) }}
        >
          CarbonIO
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            color="primary"
            sx={{ ...(isTransparent && { color: '#FFF' }) }}
          >
            Login
          </Button>
          <Button
            color="primary"
            sx={{ ...(isTransparent && { color: '#FFF' }) }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

Header.defaultProps = {
  showBackButton: false,
  isFixed: false,
  isTransparent: false,
}
