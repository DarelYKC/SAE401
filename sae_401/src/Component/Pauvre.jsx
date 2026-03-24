import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Pauvre({ data }) {
  const chartData = {
    labels: data.map((item) => item.district),
    datasets: [
      {
        label: "Taux de pauvreté (%)",
        data: data.map((item) => item.value),
        backgroundColor: ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444"],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Comparaison du taux de pauvreté",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-wrapper small">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default Pauvre;