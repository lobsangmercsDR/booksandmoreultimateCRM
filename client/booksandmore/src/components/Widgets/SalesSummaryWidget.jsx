import React, { useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableRow, Button, Link } from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { yellow } from '@mui/material/colors';
import OrderDetailsDialog from './OrderDetailsDialog';

const BookList = ({ books }) => (
  <>
    <Typography variant="h6" component="div">Últimos libros vendidos</Typography>
    <Table size="small">
      <TableBody>
        {books?.map((book, index) => (
          <TableRow key={index}>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

const OrdersTable = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Typography variant="h6" component="div">
        <TwoWheelerIcon sx={{ color: yellow[500] }} /> Pedidos pendientes de despacho
      </Typography>
      <Table size="small">
        <TableBody>
          {orders?.map((order, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.status}</TableCell>

              <TableCell>
                <Button variant="contained" color="primary" size="small" onClick={() => handleOpenDialog(order)}>Ver</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedOrder && (
        <OrderDetailsDialog order={selectedOrder} open={isDialogOpen} onClose={handleCloseDialog} />
      )}

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        <Link href="#" underline="none">
          Ver todas las órdenes
        </Link>
      </Typography>
    </>
  );
};

const SalesAndOrdersSummaryWidget = ({ salesData = [], books = [], orders = [] }) => {
  const totalSales = salesData.reduce((acc, curr) => acc + curr, 0);
  const averageSales = salesData.length > 0 ? totalSales / salesData.length : 0;

  return (
    <Card sx={{ height: '100%', minWidth: 375 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Resumen de Ventas y Pedidos
        </Typography>
        <Typography variant="h5" component="div">
          Total: ${totalSales.toLocaleString()}
        </Typography>
        <Typography variant="h5" component="div">
          Promedio: ${averageSales.toFixed(2)}
        </Typography>
        <BookList books={books} />
        <OrdersTable orders={orders} />
      </CardContent>
    </Card>
  );
}

export default SalesAndOrdersSummaryWidget;
// Path: client/booksandmore/src/components/Widgets/SalesAndOrdersSummaryWidget.jsx
