export default function UserDashboardSkeleton() {
  return (
    <div className="bg-gray-50 min-h-dvh flex flex-col gap-9 animate-pulse">
      {/* HEADER SKELETON */}
      <div className="h-16 bg-white shadow" />

      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* SIDEBAR SKELETON */}
          <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-gray-300" />
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-3 w-40 bg-gray-200 rounded" />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-gray-200 rounded" />
              ))}
            </div>
          </aside>

          {/* MAIN CONTENT SKELETON */}
          <main className="md:col-span-3 bg-white rounded-2xl shadow p-6">

            {/* TITLE */}
            <div className="h-6 w-48 bg-gray-300 rounded mb-6" />

            {/* PROFILE / FORM BLOCK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="border rounded-xl p-4 space-y-2"
                >
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-300 rounded" />
                </div>
              ))}
            </div>

            {/* BUTTON SKELETON */}
            <div className="mt-6 h-10 w-40 bg-gray-300 rounded" />

            {/* ORDERS / ADDRESSES LIST (OPTIONAL LOOK) */}
            <div className="mt-10 space-y-4">
              {[1, 2].map(i => (
                <div
                  key={i}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-300 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
