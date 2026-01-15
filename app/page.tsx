export default function Home() {
  return (
    <main style={{ background: "#0B0F1A", minHeight: "100vh", color: "white", padding: "24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
        Trading Performance Dashboard
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "32px" }}>
        <Card title="Total P&L" value="$271,949.73" color="#22c55e" />
        <Card title="Win Rate" value="68%" />
        <Card title="Profit Factor" value="3.70" />
        <Card title="Max Drawdown" value="-10.32%" color="#ef4444" />
      </div>

      <div style={{ background: "#121826", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>Calendar</h2>
        <p style={{ color: "#9ca3af" }}>Calendar view coming next…</p>
      </div>
    </main>
  );
}

function Card({ title, value, color }: { title: string; value: string; color?: string }) {
  return (
    <div style={{ background: "#121826", borderRadius: "12px", padding: "16px" }}>
      <p style={{ color: "#9ca3af", fontSize: "14px" }}>{title}</p>
      <p style={{ fontSize: "22px", fontWeight: "bold", color: color || "white" }}>
        {value}
      </p>
    </div>
  );
}
