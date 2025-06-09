import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatCurrency } from '../utils/helpers';

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentChart = () => ({ paid, remaining }) =>{
  const data = {
    labels: ['Paid', 'Remaining'],
    datasets: [{
      data: [paid, remaining],
      backgroundColor: ['#10B981', '#EF4444'],
      borderWidth: 0,
    }]
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatCurrency(value)}`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-4">Payment Progress</h3>
      <Pie data={data} options={options} />
    </div>
  );
};
export default PaymentChart;