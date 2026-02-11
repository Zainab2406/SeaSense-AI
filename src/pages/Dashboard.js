export default function Dashboard() {
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <Card title="Total Vessels" value="124" />
        <Card title="Active" value="98" />
        <Card title="Offline" value="26" />
        <Card title="Alerts" value="5" />

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h3 className="text-gray-500">{title}</h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}
