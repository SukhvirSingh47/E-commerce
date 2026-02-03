import { StatCard } from "../../components/sidebarLink";
const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];
const initialProducts = [
    { id: 1, name: "Wooden Chair", category: "Furniture", price: 2500 },
    { id: 2, name: "LED Lamp", category: "Electronics", price: 1200 }
];

const initialOrders = [
    { id: 1, product: "Wooden Chair", qty: 2, total: 5000 },
    { id: 2, product: "LED Lamp", qty: 1, total: 1200 }
];
export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Users" value={initialUsers.length} />
            <StatCard title="Products" value={initialProducts.length} />
            <StatCard title="Orders" value={initialOrders.length} />
            <StatCard
                title="Revenue"
                value={`₹${initialOrders.reduce((a, b) => a + b.total, 0)}`}
            />
        </div>
    );
}