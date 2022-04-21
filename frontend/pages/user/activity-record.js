import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { minWidth } from '@mui/system';
import Header from '../../components/Header'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Pause from '@mui/icons-material/Pause';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import FlightIcon from '@mui/icons-material/Flight';
import DoneIcon from '@mui/icons-material/Done';
import StopIcon from '@mui/icons-material/Stop';
const activityRecord = () => (
    <Box className="app-frame" style={{backgroundColor: "#4caf50" }}>
    <Header />
    <Container className="app-container" style={{backgroundColor: "#4caf50" }}>
      <Box className="app-box" >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >

            <Grid item xs={3}>
                <div className="activity-time">
            3:15

                </div>
            </Grid>   
        
        </Grid> 
        <Box className="activity-action-back">
            <Box >
                <Button className="activity-pause-button" variant="contained" component="span" style={{color:"#4caf50",borderColor:"#4caf50"}}>
                <Pause />
                </Button>
            </Box>
            
            <Stack spacing={1} >
            
            <Box className="card-green-solid activity-display-box">
                <Grid container spacing={2} className="activity-display-box-item">
                    <Grid item xs={1}>
                        <EnergySavingsLeafIcon />
                    </Grid>
                    <Grid item xs={7}>
                        Total Carbon emission
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right'}}>
                        100kg
                    </Grid>
                </Grid>
            </Box>
            <Box className="card-primary activity-display-box">
                <Grid container spacing={2} className="activity-display-box-item">
                    <Grid item xs={1}>
                        <FlightIcon />
                    </Grid>
                    <Grid item xs={7}>
                        Vehicle
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right'}}>
                        Cycling
                    </Grid>
                </Grid>
            </Box>
            <Box className="card-primary activity-display-box">
                <Grid container spacing={2} className="activity-display-box-item">
                    <Grid item xs={1}>
                        <FlightIcon />
                    </Grid>
                    <Grid item xs={7}>
                        Carbon balance
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right'}}>
                        10%
                    </Grid>
                </Grid>
            </Box>
            </Stack>
        </Box>
          
     
      </Box>
    </Container>
    </Box>
);

export default activityRecord;
