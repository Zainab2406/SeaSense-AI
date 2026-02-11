export default function Topbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">

      <h2 className="font-semibold text-lg">
        Vessel Management System
      </h2>

      <div className="flex items-center gap-3">
        <span>Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />
      </div>

    </div>
  );
}
