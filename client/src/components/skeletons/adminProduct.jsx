export default function AdminProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-pulse">

      {/* LEFT FORM */}
      <div className="xl:col-span-2 space-y-6">
        {/* Description */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>

        {/* Category */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>

        {/* Inventory */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="h-5 w-28 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="space-y-6">
        {/* Images */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-32 border-2 border-dashed rounded-xl bg-gray-100" />

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>

        {/* Button */}
        <div className="h-12 bg-purple-300/40 rounded-xl" />
      </div>

      {/* PRODUCT LIST */}
      <div className="xl:col-span-3 space-y-3">
        <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl flex justify-between items-center"
          >
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-6 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
