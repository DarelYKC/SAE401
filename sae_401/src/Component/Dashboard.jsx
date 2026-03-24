import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Statcard from "./Statcard";
import Mainchart from "./Mainchart";
import Pauvre from "./Pauvre";
import House from "./House";

function Dashboard() {
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

  const dashboardData = {
    summary: {
      population: 680000000,
      unemployment: 35,
      poverty: 17,
      housing: 5450000,
    },
    unemploymentTrend: [],
    povertyByDistrict: [],
    housingDistribution: [],
  };


  return (
    <div className="dashboard-layout">
      <Sidebar active={active} setActive={setActive} />

      <div className="main-content">
        <Header />

        <section className="cards-grid">
          <Statcard title="Nombre d’habitants" value={dashboardData.summary.population} />
          <Statcard title="Taux de chômage" value={dashboardData.summary.unemployment} suffix="%" />
          <Statcard title="Taux de pauvreté" value={dashboardData.summary.poverty} suffix="%" />
          <Statcard title="Nombre de logements" value={dashboardData.summary.housing} />
        </section>

        <section className="main-chart-card">
          <Mainchart data={dashboardData.unemploymentTrend} />
        </section>

        <section className="bottom-charts">
          <div className="bottom-card">
            <Pauvre data={dashboardData.povertyByDistrict} />
          </div>

          <div className="bottom-card">
            <House data={dashboardData.housingDistribution} />
          </div>
        </section>

        <section className="api-stats-list">
          <h2>Statistiques de l'API</h2>
          {isLoading && <p>Chargement des statistiques...</p>}
          {error && <p className="error">Erreur : {error}</p>}
          {!isLoading && !error && apiStats.length === 0 && <p>Aucune statistique disponible.</p>}

          {!isLoading && !error && apiStats.length > 0 && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Année</th>
                    <th>Département</th>
                    <th>Habitants</th>
                    <th>Logements</th>
                    <th>Chômage (%)</th>
                    <th>Pauvreté (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {apiStats.map((item) => (
                    <tr key={item.id ?? `${item.departement?.code}-${item.annee_publication}`}>
                      <td>{item.id ?? "-"}</td>
                      <td>{item.annee_publication ?? "-"}</td>
                      <td>{item.departement?.nom ?? item.departement?.code ?? "-"}</td>
                      <td>{item.nombreHabitant ?? "-"}</td>
                      <td>{item.nombreLogement ?? "-"}</td>
                      <td>{item.taux_de_chomage ?? "-"}</td>
                      <td>{item.taux_de_pauvrete ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;