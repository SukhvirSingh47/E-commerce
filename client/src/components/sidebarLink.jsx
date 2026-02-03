import { useState } from "react";
import { NavLink } from "react-router-dom";

export function SidebarLink({ to, icon, label,onClick, end=false }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
          isActive
            ? "bg-[#7c3aed] text-white"
            : "hover:bg-[#e9d5ff]"
        }`
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

export function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
