// En /components/widgets/SalesChartWidget.jsx
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesChartWidget = () => {
  const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], // Estos serían tus ejes X
    datasets: [{
      label: 'Ventas (USD)',
      data: [1200, 1900, 750, 2500], // Tus datos
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Ventas Mensuales
        </Typography>
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}

export default SalesChartWidget;
