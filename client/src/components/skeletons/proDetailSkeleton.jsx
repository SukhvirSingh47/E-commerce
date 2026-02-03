import React from "react";
import CardSkeleton from "./cardSkeleton";
export default function ProDetailSkeleton() {
  return (
    <div className="bg-gray-50  flex flex-col justify-between">
      {/* HEADER PLACEHOLDER */}
      <div className="h-20 bg-gray-100 shadow animate-pulse" />

      <div className="container mx-auto px-4 2xl:py-0 py-6 ">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:p-12 2xl:gap-10 xl:gap-5 gap-3 ">

          {/* LEFT: IMAGE SECTION */}
          <div className="flex flex-col gap-6">
            <div className="bg-white xl:rounded-xl rounded-md flex xl:gap-4 gap-2 2xl:p-6 xl:p-3 p-2 shadow animate-pulse">
              
              {/* Thumbnails */}
              <div className="flex flex-col gap-2  w-16 shrink-0 ">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gray-200 rounded-md"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex items-center justify-center w-full sm:min-h-100 bg-gray-200 animate-pulse ">
                <div className="max-w-full w-full max-h-full  aspect-square object-contain bg-gray-200 animate-pulse  rounded-md" />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col lg:flex-row md:flex-col gap-2 animate-pulse">
              <div className="h-13 w-full rounded  bg-gray-200" />
              <div className="h-13 w-full rounded bg-gray-300" />
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col gap-5">
            {/* NAME + PRICE */}
            <div className="p-6 border border-gray-200 rounded-2xl flex flex-col gap-4 animate-pulse">
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="flex gap-3 items-center">
                <div className="h-8 w-32 bg-gray-300 rounded" />
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-5 w-40 bg-gray-200 rounded" />
            </div>

            {/* DESCRIPTION */}
            <div className="p-6 border border-gray-200 rounded-2xl animate-pulse space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-11/12 bg-gray-200 rounded" />
              <div className="h-4 w-10/12 bg-gray-200 rounded" />
            </div>

            {/* STOCK */}
            <div className="p-6 border border-gray-200 rounded-2xl animate-pulse">
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        <div className="mt-14">
          <div className="h-6 w-48 bg-gray-300 rounded mb-4 animate-pulse" />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
