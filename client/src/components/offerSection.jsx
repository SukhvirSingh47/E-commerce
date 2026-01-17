import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./fallback/ImageWithFallback";
import React, { use, useRef, useEffect, useState } from "react";

const offers = [
    {
        id: 1,
        title: "Premium Headphones",
        description: "Get up to 40% off on premium audio devices",
        discount: "40% OFF",
        badge: "Limited Time",
        image: "https://images.unsplash.com/photo-1765279360461-e6b8199b906c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzJTIwdGVjaHxlbnwxfHx8fDE3NjcxODgwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "from-purple-500 to-purple-700",
    },
    {
        id: 2,
        title: "Smart Watches",
        description: "Exclusive deals on latest smartwatches",
        discount: "30% OFF",
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc2NzExMzcxNHww&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "from-blue-500 to-blue-700",
    },
    {
        id: 3,
        title: "Laptops & Computers",
        description: "Save big on high-performance devices",
        discount: "25% OFF",
        badge: "Hot Deal",
        image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjcwODg4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "from-orange-500 to-red-600",
    },
    {
        id: 4,
        title: "Laptops & Computers",
        description: "Save big on high-performance devices",
        discount: "25% OFF",
        badge: "Hot Deal",
        image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjcwODg4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "from-purple-300 to-blue-600",
    },
    {
        id: 5,
        title: "Laptops & Computers",
        description: "Save big on high-performance devices",
        discount: "25% OFF",
        badge: "Hot Deal",
        image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjcwODg4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "from-yellow-300 to-orange-600",
    },
    {
        id: 6,
        title: "Laptops & Computers",
        description: "Save big on high-performance devices",
        discount: "25% OFF",
        badge: "Hot Deal",
        image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjcwODg4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "from-pink-300 to-purple-600",
    },
];
// let keys=Object.keys(offers[1])
// console.log(keys)     output// ['id', 'title', 'description', 'discount', 'badge', 'image', 'bgColor'] converts object keys to array
export function OffersSection() {
    const scrollRef = useRef(null);
    const [appearLeft, setAppearLeft] = useState(false);
    const [appearRight, setAppearRight] = useState(true);
    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = 320; // Card width + gap
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };
const edge = useRef({ start: false, end: false });

const checkScrollEdges = () => {
  const el = scrollRef.current;
  if (!el) return;

  const atStart = el.scrollLeft <= 1;
  const atEnd =
    el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

  // Left button
  if (atStart !== edge.current.start) {
    edge.current.start = atStart;
    setAppearLeft(!atStart);
  }

  // Right button
  if (atEnd !== edge.current.end) {
    edge.current.end = atEnd;
    setAppearRight(!atEnd);
  }
};
useEffect(() => {
  checkScrollEdges();
}, []);
    return (
        <section className="py-8">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl mb-2">Special Offers</h2>
                        <p className="text-gray-600">Don't miss out on these amazing deals!</p>
                    </div>
                    <Tag className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex relative">
                    <div className="
                        pointer-events-none
                        absolute left-0 top-0 h-full w-3 z-10
                        bg-linear-to-r from-white via-white/80 to-transparent
                    " />

                    {/* RIGHT FADE */}
                    <div className="
                        pointer-events-none
                        absolute right-0 top-0 h-full w-3 z-10
                        bg-linear-to-l from-white via-white/80 to-transparent
                    " />
                    {/* Left button */}
                    <Button
                        variant="ghost"
                        className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-20 w-10 bg-[#6c44fb85] rounded-2xl hover:bg-[#6c44fbcc] ${appearLeft ? "opacity-100" : "opacity-0"} transition-opacity`}
                        onClick={() => scroll("left")}
                    >
                        {/* &lt; */}
                        <ChevronLeft className="size-7" />
                    </Button>

                    {/* Right button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-20 w-10 bg-[#6c44fb85] rounded-2xl hover:bg-[#6c44fbcc] ${appearRight ? "opacity-100" : "opacity-0"} transition-opacity`}
                        onClick={() => scroll("right")}
                    >
                        <ChevronRight className="size-7" />

                    </Button>
                    <div ref={scrollRef} onScroll={checkScrollEdges} className="flex md:gap-6 sm:gap-4 gap-2 overflow-x-auto w-full scroll-smooth scrollbar-hide px-2">

                        {/* <div  className="flex gap-6"> */}
                        {offers.map((offer) => (
                            <Card
                                key={offer.id}
                                className="shrink-0 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group snap-start w-62.5 h-77.5 sm:w-75 md:w-[320px] lg:w-85 sm:h-100 md:h-105 lg:h-110"
                            >
                                <div className={`bg-linear-to-br ${offer.bgColor} p-3 sm:p-3 md:p-4 lg:p-5 relative h-full`}>
                                    <Badge variant="outline" className="absolute top-4 right-4 bg-white text-gray-900 z-10 lg:px-3 lg:py-1 lg:text-[16px]">
                                        {offer.badge}
                                    </Badge>
                                    <div className="relative  sm:mb-4 mb-2">
                                        <ImageWithFallback
                                            src={offer.image}
                                            alt={offer.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="text-white sm:p-2">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block sm:mb-3 ">
                                            <span className="font-bold lg:text-2xl text-[15px]">{offer.discount}</span>
                                        </div>
                                        <h3 className="sm:text-xl text-[16px] sm:mb-2 font-medium">{offer.title}</h3>
                                        <p className="text-white/90 text-[12px] sm:mb-4 sm:text-[14px] mb-2 truncate">{offer.description}</p>
                                        <Button className="bg-white text-gray-900 hover:bg-white/90 w-full" >
                                            Shop Now
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </section >
    );
}
