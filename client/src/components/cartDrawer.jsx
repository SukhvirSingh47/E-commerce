import UseCart from "../context/useCart";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { ImageWithFallback } from "./fallback/ImageWithFallback";
import { useState, useMemo } from "react";
import { Header } from "./header";
import ConfirmModal from "../components/ui/confirmModal";
import EmptyCart from "./emptyCartState";
import { deleteCartItem } from "../api/cart.api";
// import toast from "react-hot-toast";

export default function CartDisplay() {
  const { cart, setCart } = UseCart();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openMobileSearch, setOpenMobileSearch] = useState(false);

  // -------- PRICE CALCULATIONS --------
  const { subtotal, totalDiscount, total } = useMemo(() => {
    let subtotal = 0;
    let discount = 0;

    cart.forEach(item => {
      const qty = item.quantity || 1;
      subtotal += item.productId.originalPrice * qty;
      discount +=
        (item.productId.originalPrice - item.productId.price) * qty;
    });

    return {
      subtotal,
      totalDiscount: discount,
      total: subtotal - discount,
    };
  }, [cart]);

  async function handleRemoveItem(id) {
    // 1. Close modal immediately
    setOpen(false);

    // 2. Take a snapshot (important for rollback!)
    const previousCart = [...cart];

    // 3. Optimistic UI update
    setCart(cart.filter(item => item.productId._id !== id));

    try {
      // 4. API call in background
      await deleteCartItem(id);
    } catch (err) {
      // 5. Rollback on failure
      setCart(previousCart);
      // toast.error(err.message || "Failed to remove item");
    }
  }

  return (
    <div className="min-h-dvh bg-gray-50" onClick={() => { setOpenMobileSearch(false) }}>
      <Header
        setOpenMobileSearch={setOpenMobileSearch}
        openMobileSearch={openMobileSearch}
      />

      <div className="container mx-auto p-3 sm:p-6">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map(item => {
                const { productId, quantity = 1 } = item;

                const discountPercent = Math.round(
                  ((productId.originalPrice - productId.price) /
                    productId.originalPrice) *
                  100
                );

                return (
                  <div
                    key={productId._id}
                    className="bg-white rounded-xl p-4 flex justify-between gap-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <Badge className="absolute top-2 left-2 bg-blue-600">
                          {productId.badge}
                        </Badge>

                        <ImageWithFallback
                          src={productId.image[0]}
                          alt={productId.name}
                          className="w-30 h-30 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="font-medium text-gray-800">
                            {productId.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ★ {productId.reviews.average} ·{" "}
                            {productId.reviews.count.toLocaleString()} reviews
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-lg font-semibold">
                            ₹{productId.price}
                          </span>
                          <span className="line-through text-gray-400 text-sm">
                            ₹{productId.originalPrice}
                          </span>
                          <Badge variant="secondary">
                            {discountPercent}% OFF
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600">
                          Qty: {quantity} · Subtotal: ₹
                          {(productId.price * quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedId(productId._id);
                        setOpen(true);
                      }}
                      className="h-9 w-9 rounded-full hover:bg-gray-200 flex items-center justify-center"
                    >
                      <X />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white rounded-xl p-5 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- ₹{totalDiscount.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-5 bg-purple-600 hover:bg-purple-700">
                Proceed to Checkout
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Secure checkout · Easy returns
              </p>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={open}
        title="Remove item"
        description="Are you sure you want to remove this item from cart?"
        closebtnName="Cancel"
        continuebtnName="Remove"
        onCancel={() => setOpen(false)}
        onConfirm={() => handleRemoveItem(selectedId)}
      />
    </div>
  );
}
