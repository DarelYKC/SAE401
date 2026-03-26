import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Mainchart({ data }) {
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

  const limitedStats = apiStats.slice(0, 50); // max 10 éléments

      const labels = [
      ...new Set(apiStats.map(item => item.annee_publication))
    ].sort();

    const departements = [
      ...new Set(apiStats.map(item => item.departement?.nom))
    ];

    const datasets = departements.map((dep) => {
      const data = labels.map((annee) => {
        const found = apiStats.find(
          (item) =>
            item.departement?.nom === dep &&
            item.annee_publication === annee
        );

        return found ? found.taux_de_chomage : null;
      });

      const color = `hsl(${Math.random() * 360}, 70%, 50%)`;

      return {
        label: dep,
        data,
        borderColor: color,
        backgroundColor: color,
        tension: 0.3,
        fill: false,
      };
    });

    const chartData2 = {
      labels,
      datasets,
    };
    const options2 = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Évolution du taux de chômage par département",
        },
        legend: {
          display: false, // ✅ indispensable ici
        },
      },
    };

    // ANCIENNE VERSION
  const chartData = {
    labels: limitedStats.map((item) => item.departement?.nom),
    datasets: [
      {
        label: "Taux de chômage (%)",
        data: limitedStats.map((item) => item.taux_de_chomage),
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
        text: "Taux de chômage",
      },
    },
  };

  return (
    <div className="chart-wrapper large">
      <Bar data={chartData2} options={options2} />
    </div>
  );
}

export default Mainchart;