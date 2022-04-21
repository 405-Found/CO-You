import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@mui/material'

const BackButton = () => {
  const router = useRouter()
  return (
    <IconButton onClick={() => router.back()}>
      <Icon>arrow_back</Icon>
    </IconButton>
  )
}

export default BackButton
