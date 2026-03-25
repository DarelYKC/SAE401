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
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Pauvre({ data }) {
  const [active, setActive] = useState("Nombre d’habitants");
  const [apiStats, setApiStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      fetch("http://localhost:8000/statistique/logement")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erreur API ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setApiStats(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);

    const limitedStats = apiStats.slice(0, 10); // max 10 éléments

  const chartData = {
    labels: limitedStats.map((item) => item.departement?.nom),
    datasets: [
      {
        label: "Taux de pauvreté (%)",
        data: limitedStats.map((item) => item.taux_de_pauvrete),
        backgroundColor: ["#3b82f6"],
        borderRadius: 5,
      },
      {
        label: "Taux de chomage (%)",
        data: limitedStats.map((item) => item.taux_de_chomage),
        backgroundColor: ["rgb(106, 0, 255)"],
        borderRadius: 5,
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