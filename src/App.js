import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Vessels from "./pages/Vessels";
import Tracking from "./pages/Tracking";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1 flex flex-col">

          <Topbar />

          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vessels" element={<Vessels />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
