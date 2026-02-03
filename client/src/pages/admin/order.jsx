const initialOrders = [
    { id: 1, product: "Wooden Chair", qty: 2, total: 5000 },
    { id: 2, product: "LED Lamp", qty: 1, total: 1200 }
];
export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      {initialOrders.map(o => (
        <div key={o.id} className="bg-white p-4 rounded mb-2">
          {o.product} × {o.qty} = ₹{o.total}
        </div>
      ))}
    </div>
  );
}