import { useState } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import { SidebarLink } from "../../components/sidebarLink";
import {
    BarChart3,
    Users,
    Package,
    ShoppingCart,
    Settings,
    Bell,
    Search,
    LogOut,
    Menu,
    X
} from "lucide-react";
import DashboardPage from "./dashboard";
import UsersPage from "./users";
import CategoriesPage from "./categories";
import ProductsPage from "./products";
import OrdersPage from "./order";
import SettingsPage from "./settings";

export default function AdminDashboard() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex bg-slate-100">
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed  z-30 h-screen w-64 bg-[#f3e8ff] text-[#4c1d95] transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="p-6 text-2xl font-bold flex gap-3 justify-between items-center" >
                    <div className="flex items-center gap-3 cursor-pointer"  onClick={() => navigate("/")}>
                        <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-2 px-3 shadow-lg">
                            <span className="text-white fredoka-logo font-bold text-2xl">CW</span>
                        </div>
                        <span className="font-bold text-[28px] flex fredoka-logo"><h1
                            className="font-fredoka font-semibold tracking-[-0.035em]
              bg-linear-to-br from-blue-600 to-purple-600
              bg-clip-text text-transparent"
                        >
                            CartWell
                        </h1></span>
                    </div>
                    <button className="md:hidden" onClick={() => setOpen(false)}>
                        <X />
                    </button>
                </div>

                <nav className="px-4 space-y-2">
                    <SidebarLink to="/admin" icon={<BarChart3 size={18} />} label="Dashboard" end onClick={() => setOpen(false)} />
                    <SidebarLink to="/admin/users" icon={<Users size={18} />} label="Users" onClick={() => setOpen(false)} />
                    <SidebarLink to="/admin/categories" icon={<Package size={18} />} label="Categories" onClick={() => setOpen(false)} />
                    <SidebarLink to="/admin/products" icon={<Package size={18} />} label="Products" onClick={() => setOpen(false)} />
                    <SidebarLink to="/admin/orders" icon={<ShoppingCart size={18} />} label="Orders" onClick={() => setOpen(false)} />
                    <SidebarLink to="/admin/settings" icon={<Settings size={18} />} label="Settings" onClick={() => setOpen(false)} />
                </nav>

                <button className="m-4 flex items-center gap-2 text-red-500">
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main */}
            <main className="flex flex-col w-full md:ml-64">
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden" onClick={() => setOpen(true)}>
                            <Menu />
                        </button>
                        <Search size={18} className="text-slate-400" />
                        <input className="outline-none text-sm" placeholder="Search..." />
                    </div>
                    <Bell />
                </header>

                <section className="p-6">
                    <Routes>
                        <Route path="" element={<DashboardPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="categories" element={<CategoriesPage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                </section>
            </main>
        </div>
    );
}
