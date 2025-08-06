import { DialogModalConfirmDeleteProps } from '../interfaces/propsInterface'
import DialogModal from './DialogModal'
import { Box, Button } from '@mui/material'

const DialogModalConfirmDelete = ({
  handleClose,
  handleConfirm,
  open,
}: DialogModalConfirmDeleteProps) => {
  return (
    <DialogModal
      dialogModalActions={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            color='primary'
            onClick={handleConfirm}
            size='large'
            variant='contained'
          >
            Confirmar eliminación
          </Button>
          <Button
            color='warning'
            onClick={handleClose}
            size='large'
            variant='contained'
            sx={{ mt: 2 }}
          >
            Cancelar
          </Button>
        </Box>
      }
      dialogModalContent={<></>}
      dialogModalContentText='Esta acción es irreversible, ¿Estás seguro de su eliminación?.'
      dialogModalTitle='Confirmar eliminación'
      handleClose={handleClose}
      open={open}
    />
  )
}

export default DialogModalConfirmDelete
