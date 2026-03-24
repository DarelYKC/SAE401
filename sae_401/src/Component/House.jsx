import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function House({ data }) {
  const chartData = {
    labels: data.map((item) => item.type),
    datasets: [
      {
        label: "Logements",
        data: data.map((item) => item.value),
        backgroundColor: ["#6366f1", "#06b6d4", "#f97316"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Répartition des logements",
      },
    },
  };

  return (
    <div className="chart-wrapper small">
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default House;