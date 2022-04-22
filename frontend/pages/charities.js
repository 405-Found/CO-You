import { Box } from '@mui/system'
import { useState } from 'react'
import Card from '@mui/material/Card'
import {
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CHARITIES } from '../lib/constants'
import Header from '../components/Header'

const Charities = () => {
  const [donateAmt, setDonateAmt] = useState({})

  const onChange = (charityName) => (event) => {
    if (event.target.value.match(/^\d+$/) || event.target.value.match(/^$/)) {
      const newAmt = { ...donateAmt }
      newAmt[charityName] = event.target.value
      setDonateAmt(newAmt)
    }
  }

  return (
    <>
      <Header showBackButton />
      <Container sx={{ py: 2 }}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={2}
        >
          {CHARITIES.map(
            ({ name, description, dollarsPerCredit, imageUrl }) => (
              <Card key={name}>
                <CardMedia
                  component="img"
                  height="180"
                  image={imageUrl}
                  alt={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ alignItems: 'stretch' }}>
                  <FormControl sx={{ flexGrow: 1, mr: 1 }}>
                    <InputLabel htmlFor="amount-input">Amount</InputLabel>
                    <OutlinedInput
                      id="amount-input"
                      label="Amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      type="number"
                      value={donateAmt[name] || ''}
                      onChange={onChange(name)}
                    />
                  </FormControl>
                  <Button variant="contained" disabled={!donateAmt[name]}>
                    Donate
                  </Button>
                </CardActions>
                {!!donateAmt[name] ? (
                  <CardActions sx={{ pt: 0 }}>
                    <Typography>
                      You will receieve{' '}
                      <Typography variant="monospace">
                        {(
                          parseFloat(donateAmt[name]) / dollarsPerCredit
                        ).toFixed(2)}
                      </Typography>{' '}
                      credits
                    </Typography>
                  </CardActions>
                ) : null}
              </Card>
            )
          )}
        </Box>
      </Container>
    </>
  )
}

export default Charities
