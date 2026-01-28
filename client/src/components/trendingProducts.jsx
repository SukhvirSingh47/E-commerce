import { Card } from "./ui/card";
import { TrendingUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import UseCart from "../context/useCart"
import PageSkeleton from "./skeletons/pageSkeleton.jsx";
import ProductCardContent from "./productCardContent";
import { getproducts } from "../api/products.api";
import { useNavigate } from "react-router-dom";
export function TrendingProducts({ }) {

  const { cart, handleAddToCart, totalCartItems } = UseCart()
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate=useNavigate()

  const cartIds = useMemo(
    () => new Set(cart.map(item => item.productId._id)),
    [cart]
  );

  useEffect(() => {
    async function GetProducts() {
      setLoading(true);
      try {
        const products=await getproducts()
        setProductList(products)
        setLoading(false)
      } catch (error) {
        console.log("error while fetching products", error)
        setLoading(false)
      }
    }
    GetProducts()
  }, [])

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl mb-2">Trending Products</h2>
            <p className="text-gray-600">Most popular items right now</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        {loading ? <PageSkeleton /> :
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6 sm:gap-4 gap-2">
            {productList.map((product) => (
              <Card
              key={product._id}
              className=" overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick= {()=>{navigate(`/productInfo/${product._id}`)}}
              >
                <ProductCardContent
                  isInCart={cartIds.has(product._id)}
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              </Card>
            ))}
          </div>
        }      </div>
    </section>
  );
}
 