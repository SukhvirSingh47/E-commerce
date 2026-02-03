const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];
export default function UsersPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      {initialUsers.map(u => (
        <div key={u.id} className="bg-white p-4 rounded mb-2">
          {u.name} — {u.email}
        </div>
      ))}
    </div>
  );
}