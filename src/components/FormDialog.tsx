import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { SendForm } from "./SendForm";

interface FormDialogProps {
  open: boolean;
  onClose: () => void; 
}
const FormDialog = ({open, onClose}: FormDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Send your documents safely
      </DialogTitle>
      <DialogContent>
        <SendForm onClose={onClose}/>
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog