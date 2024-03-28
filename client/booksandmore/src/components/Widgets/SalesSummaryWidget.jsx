// En /components/widgets/SalesSummaryWidget.jsx

import { Card, CardContent, Typography } from '@mui/material';

const SalesSummaryWidget = () => {
  const salesData = [1200, 1900, 750, 2500]; // Usa los mismos datos del gráfico para el ejemplo
  const totalSales = salesData.reduce((acc, curr) => acc + curr, 0);
  const averageSales = totalSales / salesData.length;

  return (
    <Card sx={{ height: '100%', minWidth: 275 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Resumen de Ventas
        </Typography>
        <Typography variant="h5" component="div">
          Total: ${totalSales.toLocaleString()}
        </Typography>
        <Typography variant="h5" component="div">
          Promedio: ${averageSales.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SalesSummaryWidget;
