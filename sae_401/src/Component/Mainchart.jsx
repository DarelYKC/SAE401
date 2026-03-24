import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Mainchart({ data }) {
  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: "Taux de chômage (%)",
        data: data.map((item) => item.value),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#4f46e5",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Évolution du taux de chômage",
      },
    },
  };

  return (
    <div className="chart-wrapper large">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Mainchart;