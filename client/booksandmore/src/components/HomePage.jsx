// En HomePage.jsx

import Grid from '@mui/material/Grid';
import SalesChartWidget from './Widgets/SalesChartWidget';
import SalesAndOrdersSummaryWidget from './Widgets/SalesSummaryWidget';
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
  { id: 'ORD02201', date: '2024-03-25', status: 'Pendiente' },
  { id: 'ORD002', date: '2024-03-26', status: 'Pendiente' },
  { id: 'ORD003', date: '2024-03-27', status: 'Pendiente' },
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
