import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)({
  maxWidth: "1800px",
  width: "auto",
});

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#FFFF00",
  color: "black",
  padding: "16px",
});

const StyledDialogContent = styled(DialogContent)({
  padding: "24px",
});

const OrderDetailsDialog = ({ order, open, onClose }) => {
  const getStatusColor = () => {
    switch (order.status) {
      case "Pendiente":
        return "orange";
      case "Completa":
        return "green";
      case "Cancelada":
        return "red";
      case "En proceso":
        return "blue";
      default:
        return "gray";
    }
  };

  // Calcular el precio total de los libros
  const totalPrice = order.booksOrdered.reduce((total, book) => total + book.price, 0);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="lg">
      <StyledDialogTitle>Detalles del pedido</StyledDialogTitle>
      <StyledDialogContent>
        <p>
          <strong>Id:</strong> {order.id}
        </p>
        <p>
          <strong>Fecha:</strong> {order.date}
        </p>
        <p>
          <strong>Cliente:</strong> {order.customerName}
        </p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Libro</TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.booksOrdered.map((book, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{book.title}</TableCell>
                    <TableCell align="right">${book.price}</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Box fontWeight="bold">Total: ${totalPrice}</Box>
        </Box>
      </StyledDialogContent>
      <DialogActions>
        <Box display="flex" alignItems="center">
          <Box bgcolor={getStatusColor()} color="white" p={1} borderRadius={2} mr={2}>
            {order.status}
          </Box>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </StyledDialog>
  );
};

export default OrderDetailsDialog;
