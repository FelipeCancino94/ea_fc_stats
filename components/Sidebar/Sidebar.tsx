// components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <Link href="/dashboard">Inicio</Link>
        <Link href="/dashboard/players">Jugadores</Link>
        <Link href="/dashboard/teams">Equipos</Link>
      </nav>
    </aside>
  );
}