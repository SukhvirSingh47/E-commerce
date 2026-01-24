import UseCart from "../context/useCart"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import { ImageWithFallback } from "./fallback/ImageWithFallback";
import { useEffect, useState } from "react";
import { Header } from "./header";
import ConfirmModal from "../components/ui/confirmModal"
import EmptyCart from "./emptyCartState";
import { deleteCartItem } from "../api/cart.api";

export default function CartDisplay() {
    const { cart, totalCartItems, setCart } = UseCart()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const [openMobileSearch, setOpenMobileSearch] = useState(false)

    async function handleRemoveItems(id) {
        const newCart = cart.filter((i) => i.productId._id !== id)
        setCart(newCart);

        try {
            const deletedcart = await deleteCartItem(id)
            setCart(deletedcart)
        } catch (err) {
            toast.error(err.message);
        }
        setOpen(false);
    }
    return (
        <div className="flex flex-col min-h-dvh" onClick={() => setOpenMobileSearch(false)}>
            <Header setOpenMobileSearch={setOpenMobileSearch} openMobileSearch={openMobileSearch} />
            <div className="flex borde justify-center ">

                <div className="container flex flex-col sm:p-6 p-3 gap-5">
                    {cart.length === 0 ? <EmptyCart /> :
                        cart.map((product) => (
                            <div className="flex sm:h-50 h-35 sm:gap-6 bg-[#ececec] md:w-150 w-full justify-between sm:p-3" key={product.productId._id}>
                                <div className="flex">


                                    <div className="relative bg-gray-100">
                                        <Badge className="absolute top-4 left-4 z-10 bg-blue-600">
                                            {product.productId.badge}
                                        </Badge>
                                        <div className="aspect-square relative h-full sm:w-auto">
                                            <ImageWithFallback
                                                src={product.productId.image}
                                                alt={product.productId.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-2 sm:p-3 md:p-5 ">
                                        <p className=" font-medium text-gray-500 text-[16px] sm:text-base md:text-lg lg:text-lg xl:text-xl sm:mb-2 mb-0 group-hover:text-blue-600 transition-colors">
                                            {product.productId.name}
                                        </p>

                                        <div className="flex items-center gap-2 lg:mb-3 md:mb-2 sm:mb-2.5 lg:text-[16px] text-[13px]">
                                            <div className="flex items-center">
                                                <span className="text-yellow-500 ">★</span>
                                                <span className="ml-1 ">{product.productId.reviews.average}</span>
                                            </div>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-600">
                                                {product.productId.reviews.count.toLocaleString()} reviews
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-0 sm:flex-row sm:gap-3 md:flex-col md:gap-0 lg:flex-row lg:gap-3  lg:mb-4 md:mb-3 sm:mb-2 mb-1 " >
                                            <div className="gap-3 flex items-center ">

                                                <span className="text-lg font-bold text-gray-700 lg:text-2xl md:text-xl sm:text-xl  ">${product.productId.price}</span>
                                                <span className="text-gray-400 line-through sm:text-lg text-sm">
                                                    ${product.productId.originalPrice}
                                                </span>
                                            </div>
                                            <Badge variant="secondary" className="ml-auto ">
                                                Save{" "}
                                                {Math.round(
                                                    ((product.productId.originalPrice - product.productId.price) /
                                                        product.productId.originalPrice) *
                                                    100
                                                )}
                                                %
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-10 w-10 shrink-0 hover:bg-[#dbdbdb8c] flex items-center justify-center rounded-full transition-all duration-400" onClick={() => { setOpen(true); setId(product.productId._id) }}>
                                    <X />
                                </div>

                            </div>
                        )
                        )
                    }
                </div>
            </div>
            <ConfirmModal
                open={open}
                title="Remove item"
                description="Are you sure you want to remove this item from cart?"
                closebtnName="Cancle"
                continuebtnName="Remove"
                onCancel={() => setOpen(false)}
                onConfirm={() => handleRemoveItems(id)}
            />
        </div>
    )
}