import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { minWidth } from '@mui/system';
import Header from '../components/Header'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';


// Stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
const signUp = () => {
  
  return 
    <Box className="app-frame" sx={{}}>
    <Header />
    <Container className="app-container ">
      <Box className="app-box">
      <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">

          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
       </TabContext>
        
      </Box>
    </Container>
    </Box>
    ;
  };
const enterName = () =>{
  <>
  <Stack spacing={2}>
          <Typography variant="h4" className="page-title" color="text.secondary" gutterBottom>
          What is your name?
                  </Typography>
          <Card sx={{ minWidth: 275 }} className="card-primary">
              <CardContent>
                  <Stack spacing={2}>
                  <TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder='Please enter your full name'
                          className="app-input"
                          variant="filled"
                          />
                  <Button className="btn-primary" sx={{maxWidth: "200px", textAlign: "center"}}>Next</Button>
                  </Stack>
              </CardContent>
          </Card>
          
        
          </Stack>
  </>

}
export default signUp;
