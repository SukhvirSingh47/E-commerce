import { Card } from "../../components/ui/card";
import { useState, useEffect, useMemo } from "react";
import UseCart from "../../context/useCart"
import PageSkeleton from "../../components/pageSkeleton";
import ProductCardContent from "../../components/productCardContent";
import { Header } from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import { useSearchParams } from "react-router-dom";
import NotFound from "../../components/notFount.jsx";
import { getproductList } from "../../api/products.api.js";
export default function ProductLists() {
  const { cart, handleAddToCart, totalCartItems } = UseCart()
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams]= useSearchParams()
  const [openMobileSearch, setOpenMobileSearch] = useState(false)
  // const search= searchParams.get("Search")
  const cartIds = useMemo(
    () => new Set(cart.map(item => item._id)),
    [cart]
  );
  useEffect(() => {
    async function GetProducts() {
      setLoading(true);
      // try {
      //   const res = await fetch(`http://10.37.101.193:5001/auth/query?search=${searchParams.get("search")}`);
      //   if (res.ok) {
      //     const products = await res.json()
      //     console.log(products)
      //     console.log(searchParams.get("search"))
      //     setProductList(products)
      //     setLoading(false)
      //   }

      // } catch (err) {
      //   console.log("error while fetching products", err)
      //   setLoading(false)
      // }
      try{
        const products =await getproductList(searchParams.get("search"))
        console.log(products)
        console.log(searchParams.get("search"))
        setProductList(products)
        setLoading(false)
      }catch(err){
        console.log("error while fetching products", err)
        setLoading(false)
      }
    }
    GetProducts()
  }, [searchParams.get("search")])
  return (
    <section className=" bg-gray-50 min-h-dvh flex flex-col justify-between "onClick={() => setOpenMobileSearch(false)}>
      <Header setOpenMobileSearch={setOpenMobileSearch} openMobileSearch={openMobileSearch}/>
      <div className="container p-8 mx-auto px-6">
        {loading ? <PageSkeleton /> :productList.length===0?<NotFound/>:
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 sm:gap-4 gap-2">
            {productList.map((product) => (
              <Card
                key={product._id}
                className=" overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
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
      <Footer/>
    </section>
  )
}