const initialCategories = [
  { id: 1, name: "Furniture" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Decor" }
];

export default function CategoriesPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      {initialCategories.map(c => (
        <div key={c.id} className="bg-white p-4 rounded mb-2">
          {c.name}
        </div>
      ))}
    </div>
  );
}