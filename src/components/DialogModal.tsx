import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { DialogModalProps } from '@/interfaces/propsInterface'

const DialogModal: React.FC<DialogModalProps> = ({
  dialogModalActions,
  dialogModalContent,
  dialogModalContentText,
  dialogModalTitle,
  handleClose,
  open,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{dialogModalTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogModalContentText}</DialogContentText>
        {dialogModalContent}
      </DialogContent>
      <DialogActions>{dialogModalActions}</DialogActions>
    </Dialog>
  )
}

export default DialogModal
