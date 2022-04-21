import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: '#F8F8F8' }}
                variant="outlined"
            >
                <Toolbar>
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
