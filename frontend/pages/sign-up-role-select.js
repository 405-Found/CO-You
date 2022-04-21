import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { minWidth } from '@mui/system';
import Header from '../components/Header'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const signUpRoleSelect = () => (
    <Box className="app-frame" sx={{}}>
    <Header />
    <Container className="app-container">
      <Box className="app-box">
      <Stack spacing={2}>
        <Typography variant="h4" className="page-title" color="text.secondary" gutterBottom>
        Select your role
                </Typography>
        <Card sx={{ minWidth: 275 }} className="card-primary">
            <CardContent>
                <Typography variant="h6" className="app-card"color="text.secondary" gutterBottom>
                User
                </Typography>
                <Typography variant="subtitle2" className="app-card"color="text.secondary" gutterBottom>
                Regular user who wants to reduce carbon emission
                </Typography>
                <Button className="btn-primary" sx={{minWidth: "200px"}}>Choose
                </Button>
            </CardContent>
        </Card>
        
        <Card sx={{ minWidth: 275 }} className="card-yellow">
            <CardContent>
                <Typography variant="h6" className="app-card"color="text.secondary" gutterBottom>
                Company
                </Typography>
                <Typography variant="subtitle2" className="app-card"color="text.secondary" gutterBottom>
                Business origanisations who wants to buy carbon emissions
                </Typography>
                <Button className="btn-yellow" sx={{minWidth: "200px"}}>Choose
                </Button>
            </CardContent>
        </Card>
        </Stack>
      </Box>
    </Container>
    </Box>
);

export default signUpRoleSelect;
