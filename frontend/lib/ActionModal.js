import { Icon, IconButton, Modal } from '@mui/material'
import { Box } from '@mui/system'

const ActionModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="gift-modal"
      aria-describedby="gift-credits-to-friends"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
        maxWidth={400}
        bgcolor="background.paper"
        boxShadow={24}
        width={['calc(100% - 32px)', '100%']}
        p={4}
        borderRadius={1}
      >
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: 'rgba(255,255,255,0.8)',
            position: 'absolute',
            right: 0,
            mt: -6,
            top: 0,
          }}
        >
          <Icon>close</Icon>
        </IconButton>
        {children}
      </Box>
    </Modal>
  )
}
export default ActionModal
