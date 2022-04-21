import { useState } from 'react'
import {
  Button,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import Container from '@mui/material/Container'
import Header from '../components/Header'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Box } from '@mui/system'

const transportationTypes = [
  'Diesel Car',
  'Electric Vehicle',
  'Motorcycle',
  'Truck',
]

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
      <TextField onChange={onChange(typeName)} value={value[typeName]} />
      <Typography variant="subtitle">hours</Typography>
    </Box>
  </ListItem>
)

const TransportationEstimate = () => {
  const [hourData, setHourData] = useState(
    transportationTypes.reduce((a, v) => ({ ...a, [v]: '0' }), {})
  )

  const handleChange = (typeName) => (event) => {
    if (event.target.value.match(/^\d+$/) || event.target.value.match(/^$/)) {
      const newHourData = { ...hourData }
      newHourData[typeName] = event.target.value
      setHourData(newHourData)
    }
  }

  const submitHourData = () => {
    console.log(hourData)
  }

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" sx={{ marginY: 2 }}>
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
        <Button variant="contained" fullWidth onClick={submitHourData}>
          Continue
        </Button>
      </Container>
    </>
  )
}

export default TransportationEstimate
