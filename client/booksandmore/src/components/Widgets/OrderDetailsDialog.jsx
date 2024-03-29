import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";


const OrderDetailsDialog = ({ order, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalles del pedido</DialogTitle>
      <DialogContent>
        <p>Id: {order.id}</p>
        <p>Fecha: {order.date}</p>
        <p>Estado: {order.status}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
// Path: client/booksandmore/src/components/Widgets/OrderDetailsDialog.jsx
