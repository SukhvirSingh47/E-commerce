import { useEffect, useState } from "react"
import { Loader, TrendingUp, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ImageWithFallback } from "../../components/fallback/ImageWithFallback";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/header.jsx"
export default function ProductLists() {
  const [productList, setProductList] = useState()
  useEffect(() => {
    async function GetProducts() {
      try {
        const res = await fetch("http://10.105.96.193:5001/auth/products");
        if (res.ok) {
          const products = await res.json()
          console.log(products)
          setProductList(products)
        }

      } catch (err) {
        console.log("error while fetching products", err)
      }
    }
    GetProducts()
  },[])
  return (
    <div className=" flex flex-col justify-center ">
      <Header />
      <div className="flex justify-center container mx-auto">

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 sm:gap-4 gap-2 p-4">
          {!productList ? <Loader /> : productList.map((product) => (
            <Card
              key={product._id}
              product={product}
              className=" overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >

              <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gray-100">
                  <Badge className="absolute top-4 left-4 z-10 bg-blue-600">
                    {product.badge}
                  </Badge>
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                        100
                      )}
                      %
                    </Badge>
                  </div>

                  {/* <Button onclick={() => {
                    if (isInCart) {
                      navigate("/cart")
                    } else { handleAddToCart(product) }
                  }} className="w-full gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    {isInCart ? "Go to cart" : "Add to Cart"}
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}