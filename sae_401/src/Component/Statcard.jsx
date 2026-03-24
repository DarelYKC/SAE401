function Statcard({ title, value, suffix = "" }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>
        {typeof value === "number" && !suffix.includes("%")
          ? value.toLocaleString("fr-FR")
          : value}
        {suffix}
      </p>
    </div>
  );
}

export default Statcard;