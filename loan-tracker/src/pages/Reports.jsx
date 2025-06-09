import { useLoans, usePayments } from '../hooks/useLoans';  // Fixed import path
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { formatCurrency } from '../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const { loans } = useLoans();
  const { payments } = usePayments();

  const paymentData = payments.reduce((acc, payment) => {
    const date = new Date(payment.paymentDate).toLocaleDateString('default', { month: 'short' });
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += payment.amountPaid;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(paymentData),
    datasets: [
      {
        label: 'Payments Collected',
        data: Object.values(paymentData),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return formatCurrency(context.raw);
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-medium mb-4">Monthly Payments</h2>
          <Bar data={chartData} options={options} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-medium mb-4">Loan Status Summary</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Status</th>
                <th className="text-right py-2">Count</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {['active', 'late', 'fully_paid', 'defaulted'].map(status => {
                const filteredLoans = loans.filter(l => l.status === status);
                return (
                  <tr key={status} className="border-t">
                    <td className="py-2 capitalize">{status.replace('_', ' ')}</td>
                    <td className="py-2 text-right">{filteredLoans.length}</td>
                    <td className="py-2 text-right">
                      {formatCurrency(filteredLoans.reduce((sum, loan) => sum + loan.totalPrice, 0))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;