import React, { useState, useEffect } from "react";
import { User, Package, MapPin, LogOut, Edit, CheckCircle, Save, X } from "lucide-react";
import { Header } from "../../components/header";
import UseAuth from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import UserDashboardSkeleton from "../../components/skeletons/UserDashboardSkeleton";
import ConfirmModal from "../../components/ui/confirmModal"
export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAD, setIsEditingAD] = useState(false);
    const [openMobileSearch, setOpenMobileSearch] = useState(false)
    const { isUser } = UseAuth()
    const [formData, setFormData] = useState(isUser);
    const navigate = useNavigate()
    const[open, setOpen]=useState(false)
    const orders = [
        { id: "ORD123", date: "12 Jan 2026", total: 2499, status: "Delivered" },
        { id: "ORD124", date: "18 Jan 2026", total: 899, status: "Processing" },
    ];

    const addresses = [
        { id: 1, label: "Home", address: "Balachaur, SBS Nagar, Punjab" },
        { id: 2, label: "Workshop", address: "Ghoon Road, Punjab" },
    ];

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // setUser(formData); // later replace with API call
        setIsEditing(false);
    };
    if (isUser.loading) {
        return <UserDashboardSkeleton />
    }
    return (
        <div className=" bg-gray-50 min-h-dvh flex flex-col gap-9" onClick={()=>{setOpenMobileSearch(false)}}>
            <Header setOpenMobileSearch={setOpenMobileSearch} openMobileSearch={openMobileSearch} />
            <div className="container mx-auto">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* SIDEBAR */}
                    <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-semibold">
                                {isUser?.user?.charAt(0)}
                            </div>
                            <h2 className="text-lg font-semibold">{isUser?.user}</h2>
                            <p className="text-sm text-gray-500">{isUser?.email}</p>
                        </div>

                        <nav className="mt-6 flex flex-col gap-2">
                            <button onClick={() => setActiveTab("profile")} className={`flex items-center gap-2 p-2 rounded ${activeTab === "profile" && "bg-purple-50 text-purple-600"}`}>
                                <User size={18} /> Profile
                            </button>
                            <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-2 p-2 rounded ${activeTab === "orders" && "bg-purple-50 text-purple-600"}`}>
                                <Package size={18} /> Orders
                            </button>
                            <button onClick={() => setActiveTab("addresses")} className={`flex items-center gap-2 p-2 rounded ${activeTab === "addresses" && "bg-purple-50 text-purple-600"}`}>
                                <MapPin size={18} /> Addresses
                            </button>
                            <button className="flex items-center gap-2 p-2 rounded hover:bg-red-50 text-red-600 mt-4" onClick={()=>setOpen(true)}>
                                <LogOut size={18} /> Logout
                            </button>
                        </nav>
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="md:col-span-3 bg-white rounded-2xl shadow p-6">
                        {activeTab === "profile" && (
                            <>
                                <h1 className="text-2xl font-semibold mb-4">Profile Details</h1>

                                {!isEditing ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="border rounded-xl p-4"><h3 className="text-sm text-gray-500">Full Name</h3><p className="font-medium">{isUser?.user}</p></div>
                                        <div className="border rounded-xl p-4"><h3 className="text-sm text-gray-500">Email</h3><p className="font-medium">{isUser?.email}</p></div>
                                        <div className="border rounded-xl p-4"><h3 className="text-sm text-gray-500">Phone</h3><p className="font-medium">{isUser?.phone}</p></div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <input name="name" value={formData.name} onChange={handleChange} className="border rounded-xl p-3" placeholder="Full Name" />
                                        <input name="email" value={formData.email} onChange={handleChange} className="border rounded-xl p-3" placeholder="Email" />
                                        <input name="phone" value={formData.phone} onChange={handleChange} className="border rounded-xl p-3" placeholder="Phone" />
                                    </div>
                                )}

                                {!isEditing ? (
                                    <button onClick={() => { setFormData(isUser); setIsEditing(true); }} className="mt-6 flex items-center gap-2 px-4 py-2 rounded bg-purple-600 text-white">
                                        <Edit size={16} /> Edit Profile
                                    </button>
                                ) : (
                                    <div className="mt-6 flex gap-3">
                                        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white">
                                            <Save size={16} /> Save
                                        </button>
                                        <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200">
                                            <X size={16} /> Cancel
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "orders" && (
                            <>
                                <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.id} className="border rounded-xl p-4 flex justify-between items-center">
                                            <div><p className="font-medium">Order #{order.id}</p><p className="text-sm text-gray-500">{order.date}</p></div>
                                            <div className="text-right"><p className="font-semibold">₹{order.total}</p><span className="text-sm flex items-center gap-1 text-green-600"><CheckCircle size={14} /> {order.status}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === "addresses" && (
                            <>
                                <h1 className="text-2xl font-semibold mb-4">Saved Addresses</h1>
                                {!isEditingAD ? (
                                    <div className="space-y-4">
                                        {addresses.map(addr => (
                                            <div key={addr.id} className="border rounded-xl p-4"><p className="font-medium">{addr.label}</p><p className="text-sm text-gray-500">{addr.address}</p></div>
                                        ))}<button className="mt-6 px-4 py-2 rounded bg-purple-600 text-white" onClick={() => setIsEditingAD(true)}>+ Add New Address</button>
                                    </div>) : (
                                    <div>
                                        <textarea
                                            className="w-full border p-2 rounded"

                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                        /><button className="mt-6 px-4 py-2 rounded bg-purple-600 text-white" onClick={() => setIsEditingAD(false)}> Save Address</button>
                                    </div>
                                )
                                }
                            </>
                        )}
                    </main>
                </div>
            </div>
            <ConfirmModal
                open={open}
                title="Do you really want to log out"
                closebtnName="No"
                continuebtnName="Yes"
                onCancel={() => setOpen(false)}
                onConfirm={() => { localStorage.removeItem("token"); window.location.reload(); }}
            />
        </div>
    );
}
