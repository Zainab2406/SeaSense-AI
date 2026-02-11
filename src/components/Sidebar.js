import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        🚢 SeaSense AI
      </h1>

      <nav className="space-y-4">

        <Link to="/" className="block hover:text-yellow-400">
          Dashboard
        </Link>

        <Link to="/vessels" className="block hover:text-yellow-400">
          Vessels
        </Link>

        <Link to="/tracking" className="block hover:text-yellow-400">
          Tracking
        </Link>

        <Link to="/analytics" className="block hover:text-yellow-400">
          Analytics
        </Link>

      </nav>
    </div>
  );
}
