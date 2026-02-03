import React from "react";
import { CardContent, Card } from "../../components/ui/card";

export default function ProductCardSkeleton() {
    return (
        <Card
            
            className=" overflow-hidden border-0 "
            onClick={() => { navigate(`/productInfo/${product._id}`) }}
        >
            <CardContent className="p-0 animate-pulse">
                {/* IMAGE */}
                <div className="relative aspect-square bg-gray-200 overflow-hidden">
                    {/* Badge placeholder */}
                    <div className="absolute top-4 left-4 h-6 w-14 rounded bg-gray-300" />
                </div>

                {/* CONTENT */}
                <div className="p-2 sm:p-3 md:p-5">
                    {/* NAME */}
                    <div className="h-4 sm:h-5 md:h-6 w-4/5 bg-gray-200 rounded mb-2" />

                    {/* RATING */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-10 bg-gray-200 rounded" />
                        <div className="h-4 w-1 bg-gray-300 rounded-full" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>

                    {/* PRICE + DISCOUNT */}
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 md:flex-col lg:flex-row lg:gap-3 mb-2">
                        <div className="flex gap-2 items-center">
                            <div className="h-6 w-16 bg-gray-300 rounded" />
                            <div className="h-4 w-12 bg-gray-200 rounded" />
                        </div>
                        <div className="h-5 w-14 bg-gray-200 rounded ml-auto" />
                    </div>

                    {/* BUTTON */}
                    <div className="h-10 w-full bg-gray-300 rounded" />
                </div>
            </CardContent>
        </Card>
    );
}
