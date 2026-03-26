import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function House({ data }) {
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

    const limitedStats = apiStats.slice(20, 25); // max 10 éléments

  const chartData = {
    labels: limitedStats.map((item) => item.departement?.nom),
    datasets: [
      {
        label: "Logements",
        data: limitedStats.map((item) => item.nombreLogement),
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
        text: "Comparaison du Répartition des logements",
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