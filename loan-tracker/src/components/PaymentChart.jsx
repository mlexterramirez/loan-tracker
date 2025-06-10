import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PaymentChart({ loans }) {
  const data = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [
          loans.filter(l => l.status === 'fully_paid').length,
          loans.filter(l => l.status === 'active').length,
          loans.filter(l => l.status === 'late').length,
        ],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#EF4444'
        ],
        borderWidth: 0,
      },
    ],
  }

  return <Pie data={data} />
}