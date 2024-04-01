// En HomePage.jsx


import SalesAndOrdersSummaryWidget from '../Widgets/SalesSummaryWidget';
import SalesChartWidget from '../Widgets/SalesChartWidget';
import Grid from '@mui/material/Grid';





// Importa otros widgets aquí




const salesData = [1200, 1900, 750, 2500];

// Datos de prueba para books
const books = [
  { title: 'El principito', author: 'Antoine de Saint-Exupéry', price: 9.99},
  { title: 'Cien años de soledad', author: 'Gabriel García Márquez', price: 12.99},
  { title: '1984', author: 'George Orwell', price: 15.99},
];

// Datos de prueba para orders
const orders = [
  {
    id: 'ORD02201',
    date: '2024-03-25',
    status: 'Pendiente',
    customerName: 'John Doe',
    booksOrdered: ['El principito', 'Cien años de soledad'],
    shippingCost: 5.99,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD002',
    date: '2024-03-26',
    status: 'Pendiente',
    customerName: 'Jane Smith',
    booksOrdered: ['1984'],
    shippingCost: 3.99,
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD003',
    date: '2024-03-27',
    status: 'Pendiente',
    customerName: 'Bob Johnson',
    booksOrdered: ['El principito', '1984'],
    shippingCost: 7.99,
    paymentMethod: 'Credit Card'
  },
];

const HomePage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <SalesAndOrdersSummaryWidget salesData={salesData} books={books} orders={orders} />

      </Grid>
      <Grid item xs={8}>
        <SalesChartWidget />
        </Grid>

    </Grid>


  );
}

export default HomePage;

