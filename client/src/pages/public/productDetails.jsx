import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getproductInfo, getproductList } from "../../api/products.api";
import { Card } from "../../components/ui/card";
import ProductCardContent from "../../components/productCardContent";
import UseCart from "../../context/useCart";
import { Header } from "../../components/header";
import { Star, ShoppingCart, ChevronsRight,ArrowRightIcon } from "lucide-react";
import PageSkeleton from "../../components/skeletons/pageSkeleton.jsx";
// import axios from "axios";

export default function ProductDetails() {
    const { id } = useParams(); // get product ID from URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const { cart, handleAddToCart } = UseCart()
    const [openMobileSearch, setOpenMobileSearch] = useState(false)
    const [mainphoto, setMainPhoto] = useState(null)

    const cartIds = useMemo(
        () => new Set(cart.map(item => item.productId._id)),
        [cart]
    );

    useEffect(() => {
        setMainPhoto(null)
        async function fetchProduct() {
            try {
                const data = await getproductInfo(id)
                setProduct(data)
                const productList = await getproductList(data.category)
                setSimilarProducts(productList)
            } catch (err) {
                console.log(err)
            }
        }

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            setMainPhoto(product.image[0])
        }
    }, [product])

    if (!product) return <PageSkeleton />;

    return (
        <div className="bg-gray-50  flex flex-col justify-between" onClick={() => setOpenMobileSearch(false)}>
            <Header setOpenMobileSearch={setOpenMobileSearch} openMobileSearch={openMobileSearch} />
            <div className="container mx-auto px-4 py-6 ">

                {/* TOP SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:p-12 2xl:gap-10 xl:gap-5 gap-3 ">

                    {/* IMAGE */}
                    <div className=" flex flex-col gap-6">

                        <div className="bg-white xl:rounded-xl rounded-md flex xl:gap-4 gap-2 2xl:p-6 xl:p-3 p-2 shadow">
                            {/* <div className="flex gap-4"> */}
                            <div className="flex flex-col gap-2  w-16 shrink-0  ">
                                {product.image.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        className={`w-16 h-16 ${mainphoto === img ? "outline-2 outline-purple-600" : "outline-0"} rounded-md cursor-pointer`}
                                        onClick={() => setMainPhoto(img)}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-center w-full sm:min-h-100 ">
                                <img
                                    src={mainphoto}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            {/* </div> */}
                        </div>

                        {/* PRODUCT INFO */}

                        <div className="flex flex-col lg:flex-row md:flex-col gap-2">

                            <button onClick={(e) => {e.stopPropagation()
                            if (cartIds.has(product._id)) {
                                navigate("/cart")
                            } else { handleAddToCart(product)}}} className=" w-full flex justify-center items-center gap-2  py-3 rounded border border-purple-500 text-purple-500 font-semibold">
                                <ShoppingCart />{cartIds.has(product._id) ? <div className="flex justify-center items-center gap-2">Goto Cart <ArrowRightIcon/></div> : "Add to Cart"}
                            </button>

                            <button className="flex justify-center items-center w-full border bg-purple-500 py-3 rounded text-white text-[20px] font-semibold">

                               <ChevronsRight />

                                Buy Now
                            </button>
                        </div>

                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="p-6 border border-[#e6e6e6] flex flex-col gap-3 rounded-2xl">
                            <h1 className="text-xl text-[#707070] font-semibold">
                                {product.name}
                            </h1>
                            <div className="">
                                <span className="text-4xl font-normal text-[#494949]">₹{product.price}</span>
                                <span className="line-through text-gray-400 ml-2">₹{product.originalPrice}</span>
                                <span className="text-orange-600 ml-2">{Math.round(
                                    ((product.originalPrice - product.price) /
                                        product.originalPrice) * 100
                                )}% Off</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-green-600 text-white font-bold px-2 rounded-2xl gap-1 flex text-sm justify-center items-center">
                                    {product.reviews.average} <Star size={15} fill="#ffff" />
                                </span>
                                <span className="text-sm font-medium text-gray-500 flex justify-center items-center gap-1">
                                    {product.reviews.count} Ratings <div className="h-1 w-1 bg-[#9e9d9d] rounded-full"></div>
                                </span>
                            </div>
                        </div>
                        <div className="p-6 border border-[#e6e6e6] rounded-2xl">
                                <p>{product.description}</p>
                        </div>
                        <div className="p-6 border border-[#e6e6e6] rounded-2xl">
                                <p>Avalable stock: {product.stock}ps</p>
                        </div>
                    </div>
                </div>

                {/* SIMILAR PRODUCTS */}
                <div className="mt-14">
                    <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6 sm:gap-4 gap-2">
                        {similarProducts.map(p => (p._id != product._id &&
                            <Card
                                key={p._id}
                                className=" overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                onClick={() => { navigate(`/productInfo/${p._id}`) }}
                            >
                                <ProductCardContent
                                    isInCart={cartIds.has(p._id)}
                                    product={p}
                                    handleAddToCart={handleAddToCart}
                                />
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    );
}
