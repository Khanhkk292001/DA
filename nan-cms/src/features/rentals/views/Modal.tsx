import CloseIcon from '@mui/icons-material/Close'
import { Modal, ModalProps, Stack, styled } from '@mui/material'

type ModalCustomProps = {
  onClose: () => void
} & ModalProps

export const ModalCustom: React.FC<ModalCustomProps> = ({ onClose: handleClose, open, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ContainerModal>
        <CloseIcon
          onClick={handleClose}
          sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', color: '#AAAA' }}
        />

        {children}
      </ContainerModal>
    </Modal>
  )
}

export const ContainerModal = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
}))
