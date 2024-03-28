// En HomePage.jsx

import Grid from '@mui/material/Grid';
import SalesChartWidget from './Widgets/SalesChartWidget';
import SalesSummaryWidget from './Widgets/SalesSummaryWidget';
// Importa otros widgets aquí


const HomePage = () => {
  return (
    <Grid container spacing={12}>
      <Grid item xs={4}>
        <SalesSummaryWidget />
      </Grid>
      <Grid item xs={12}>
        <SalesChartWidget />
      </Grid>
    </Grid>
  );
}

export default HomePage;
