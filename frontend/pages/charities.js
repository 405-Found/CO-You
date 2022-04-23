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
  Grid,
} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CHARITIES } from '../lib/constants'
import Header from '../components/Header'
import axios from 'axios'

import Wave from 'react-wavify'

import AddIcon from '@mui/icons-material/Add'

import BackButton from '../components/BackButton'
import ActionModal from '../lib/ActionModal'
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
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Header isFixed isTransparent />
        <Box
          sx={{
            display: 'grid',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#00c853',
              paddingTop: '80px',
              textAlign: 'center',
            }}
            alignItems="flex-end"
          >
            <Typography
              color="#FFF"
              margin
              fontWeight="bold"
              gutterBottom
              fontSize={30}
            >
              Top up carbon credits
            </Typography>
            <Typography color="rgba(255,255,255,0.8)" fontSize={16}>
              Donate to green charities and earn
            </Typography>
          </Box>
          <Wave
            fill="#00c853"
            paused={false}
            options={{
              height: 80,
              amplitude: 20,
              speed: 0.15,
              points: 3,
            }}
            style={{
              transform: 'rotate(180deg)',
              marginBottom: -50,
              marginTop: '-2px',
            }}
          />
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{ height: '70vh' }}
        >
          <Grid item xs={1}>
            <div className="page-title">
              <div className="page-title">
                <Box position="relative">
                  <Box
                    position="absolute"
                    left={-40}
                    top="50%"
                    sx={{ transform: 'translateY(-50%)' }}
                    mb={2}
                  >
                    <BackButton />
                  </Box>
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
                    />
                  </form>
                </Box>
              </div>
            </div>
          </Grid>
          <Grid item xs={7} maxWidth="600px">
            <Box
              style={{
                maxHeight: '450px',
                maxWidth: '300px',
                overflowY: 'scroll',
                scrollBehaviour: 'smooth',
              }}
            >
              {charities.map(({ id, name, description, moneyPerKilo }) => (
                <Card
                  className="card-primary"
                  key={id}
                  style={{
                    marginBottom: '20px',
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxHeight: '40px',
                      }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ alignItems: 'stretch' }}>
                    <FormControl sx={{ flexGrow: 1, mr: 1 }} color="success">
                      <InputLabel htmlFor="amount-input">Amount</InputLabel>
                      <OutlinedInput
                        id="amount-input"
                        label="Amount"
                        placeholder="Enter amount"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        type="number"
                        value={donateAmt[name] || ''}
                        onChange={onChange(name)}
                      />
                    </FormControl>
                    <Button
                      variant="contained"
                      className="btn btn-primary"
                      disabled={!donateAmt[name]}
                    >
                      Donate
                    </Button>
                  </CardActions>
                  {!!donateAmt[name] ? (
                    <CardActions sx={{ pt: 0 }}>
                      <Typography>
                        You will receieve{' '}
                        <Typography variant="monospace">
                          <strong>
                            {(
                              parseFloat(1000 * donateAmt[name]) / moneyPerKilo
                            ).toFixed(1)}
                          </strong>
                        </Typography>{' '}
                        carbon credits
                      </Typography>
                    </CardActions>
                  ) : null}
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Charities
