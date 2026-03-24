function Sidebar({ active, setActive }) {
  const items = [
    "Nombre d’habitants",
    "Taux de chômage",
    "Taux de pauvreté",
    "Nombre de logements",
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">📊</div>

      <div className="sidebar-menu">
        {items.map((item) => (
          <button
            key={item}
            className={`sidebar-btn ${active === item ? "active" : ""}`}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;