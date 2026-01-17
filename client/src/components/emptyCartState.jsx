import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
      {/* Icon */}
      <div className="relative">
        <ShoppingBag size={100} className="text-purple-500" />
        <span className="absolute -left-6 top-1 text-gray-400 text-xl">~</span>
        <span className="absolute -right-6 top-3 text-gray-400 text-xl">~</span>
      </div>

      {/* Text */}
      <h2 className="text-xl font-semibold text-gray-800">
        Hey, it feels so light!
      </h2>
      <p className="text-gray-500 text-sm max-w-sm">
        There is nothing in your bag. Let’s add some items.
      </p>

      {/* Button */}
      <Button
        variant="outline"
        className="border-purple-500 text-purple-500 hover:bg-pink-50"
        // onClick={() => navigate("/wishlist")}
        onClick={() => navigate("/")}
      >
        ADD ITEMS FROM WISHLIST
      </Button>
    </div>
  );
}
