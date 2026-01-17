export default function PageSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 sm:gap-4 gap-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-zinc-50 p-4 space-y-4"
        >
          {/* Image */}
          <div className="h-80 w-full rounded-lg bg-zinc-300" />

          {/* Title */}
          <div className="h-4 w-3/4 rounded bg-zinc-300" />

          {/* Price */}
          <div className="h-4 w-1/2 rounded bg-zinc-300" />

          {/* Button */}
          <div className="h-15 w-full rounded-lg bg-zinc-300" />
        </div>
      ))}
    </div>
  );
}
