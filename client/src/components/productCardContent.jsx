import React, { useMemo, useState } from "react";
import { CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./fallback/ImageWithFallback";
import { Button } from "./ui/button";
import { ShoppingBag, ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UseCart from "../context/useCart";
const ProductCardContent = React.memo(function ProductCardContent({
    product,
    isInCart,
    handleAddToCart
}) {
    const{cart}=UseCart()
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate()
    const discount = useMemo(() => {
        console.log("memo")
        return Math.round(
            ((product.originalPrice - product.price) /
                product.originalPrice) * 100
        );
    }, [product.price, product.originalPrice]);

    // console.count("ProductCardContent render");

    return (
        <CardContent className="p-0">
            {/* {!imageLoaded && (
                <div className="animate-pulse">
                    <div className="bg-gray-200 aspect-square w-full" />
                    <div className="p-3">
                        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                        <div className="h-8 bg-gray-200 rounded mt-2 w-full"></div>
                    </div>
                </div>
            )} */}
            {/* className={imageLoaded ? "block" : "hidden"} */}
            <div  >
                <div className="relative h-full flex justify-center items-center overflow-hidden bg-gray-100 aspect-square">
                    <Badge className="absolute top-4 left-4 z-10 bg-blue-600">
                        {product.badge}
                    </Badge>
                    {!imageLoaded && (
                        <div className="animate-pulse  bg-zinc-50 ">
                            <div className="bg-zinc-300 aspect-square w-full" />
                        </div>
                    )}
                    <div className={imageLoaded ? "block" : "hidden"}>
                        <ImageWithFallback
                            src={product.image[0]}
                            alt={product.name}
                            loading="eager"
                            decoding="async"
                            className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                </div>

                <div className="p-2 sm:p-3 md:p-5  ">
                    <p className=" font-medium text-gray-500 truncate text-[16px] sm:text-base md:text-lg lg:text-lg xl:text-xl sm:mb-2 mb-0 group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </p>

                    <div className="flex items-center gap-2 lg:mb-3 md:mb-2 sm:mb-2.5 lg:text-[16px] text-[13px]">
                        <div className="flex items-center">
                            <span className="text-yellow-500 ">★</span>
                            <span className="ml-1 ">{product.reviews.average}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                            {product.reviews.count.toLocaleString()} reviews
                        </span>
                    </div>

                    <div className="flex flex-col gap-0 sm:flex-row sm:gap-3 md:flex-col md:gap-0 lg:flex-row lg:gap-3  lg:mb-4 md:mb-3 sm:mb-2 mb-1" >
                        <div className="gap-3 flex items-center">

                            <span className="text-lg font-bold text-gray-700 lg:text-2xl md:text-xl sm:text-xl  ">${product.price}</span>
                            <span className="text-gray-400 line-through sm:text-lg text-sm">
                                ${product.originalPrice}
                            </span>
                        </div>
                        <Badge variant="secondary" className="ml-auto ">
                            Save{" "}
                            {discount}
                            %
                        </Badge>
                    </div>

                    <Button onclick={(e) => {e.stopPropagation()
                            if (isInCart) {
                                navigate("/cart")
                            } else { handleAddToCart(product) }
                            // console.log(isInCart)
                            // console.log(cart.map(item => item.productId._id))
                            // console.log(product._id)
                            // console.log(isInCart)
                        }}
                    className="w-full gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        {isInCart ? <div className="flex justify-center items-center gap-2">Goto Cart <ArrowRightIcon/></div> : "Add to Cart"}
                    </Button>
                </div>
            </div>
        </CardContent>
    );
});

export default ProductCardContent;
