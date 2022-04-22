import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import {
  Container,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CHARITIES } from '../lib/constants'
import Header from '../components/Header'
import axios from 'axios'

const Charities = () => {
  const [donateAmt, setDonateAmt] = useState({})
  const [charities, setCharities] = useState([])

  const onChange = (charityName) => (event) => {
    if (event.target.value.match(/^\d+$/) || event.target.value.match(/^$/)) {
      const newAmt = { ...donateAmt }
      newAmt[charityName] = event.target.value
      setDonateAmt(newAmt)
    }
  }

  useEffect(() => {
    fetchCharities()
  }, [])

  const [search, setSearch] = useState('')

  const fetchCharities = async () => {
    const res = await axios.get(`/api/charityOrgs?sort=true&keyword=${search}`)
    console.log(res.data)
    setCharities(res.data)
  }

  const onSearch = async (event) => {
    event.preventDefault()
    await fetchCharities()
  }

  return (
    <>
      <Header showBackButton />
      <Container sx={{ py: 2 }}>
        <form onSubmit={onSearch}>
          <TextField
            label="Search Charities"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button type="submit">Search</Button>
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ mb: 2 }}
          />
        </form>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={2}
        >
          {charities.map(({ id, name, description, moneyPerKilo }) => (
            <Card key={id}>
              <CardMedia
                component="img"
                height="180"
                // image={imageUrl}
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
                      {(parseFloat(donateAmt[name]) / moneyPerKilo).toFixed(2)}
                    </Typography>{' '}
                    credits
                  </Typography>
                </CardActions>
              ) : null}
            </Card>
          ))}
        </Box>
      </Container>
    </>
  )
}

export default Charities
