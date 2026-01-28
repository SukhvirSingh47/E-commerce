import { Card } from "../../components/ui/card";
import { useState, useEffect, useMemo } from "react";
import UseCart from "../../context/useCart"
import PageSkeleton from "../../components/skeletons/pageSkeleton.jsx";
import ProductCardContent from "../../components/productCardContent";
import { Header } from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import { useSearchParams } from "react-router-dom";
import NotFound from "../../components/notFount.jsx";
import { getproductList } from "../../api/products.api.js";
import { useNavigate } from "react-router-dom";
export default function ProductLists() {
  const { cart, handleAddToCart, totalCartItems } = UseCart()
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openMobileSearch, setOpenMobileSearch] = useState(false)
  const navigate=useNavigate()
  // const search= searchParams.get("Search")
  const cartIds = useMemo(
    () => new Set(cart.map(item => item._id)),
    [cart]
  );
  useEffect(() => {
    async function GetProducts() {
      setLoading(true);
      try {
        const products = await getproductList(searchParams.get("search"))
        console.log(products)
        console.log(searchParams.get("search"))
        setProductList(products)
        setLoading(false)
      } catch (err) {
        console.log("error while fetching products", err)
        setLoading(false)
      }
    }
    GetProducts()
  }, [searchParams.get("search")])
  return (
    <section className=" bg-gray-50 min-h-dvh flex flex-col justify-between " onClick={() => setOpenMobileSearch(false)}>
      <Header setOpenMobileSearch={setOpenMobileSearch} openMobileSearch={openMobileSearch} />
      <div className="container p-8 mx-auto px-6">
        {loading ? <PageSkeleton /> : productList.length === 0 ? <NotFound /> :
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6 sm:gap-4 gap-2">
            {productList.map((product) => (
              <Card
              key={product._id}
              className=" overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => { navigate(`/productInfo/${product._id}`) }}
              >
                <ProductCardContent
                  isInCart={cartIds.has(product._id)}
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              </Card>
            ))}
          </div>
        }
      </div>
      <Footer />
    </section>
  )
}