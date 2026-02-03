import { ShoppingBag, TelescopeIcon, Telescope } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound(){
    const navigate = useNavigate();
    return(
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
              {/* Icon */}
              <div className="relative">
                <Telescope size={100} className="text-purple-500" />
                <span className="absolute -left-6 top-1 text-gray-400 text-xl">~</span>
                <span className="absolute -right-6 top-3 text-gray-400 text-xl">~</span>
              </div>
        
              {/* Text */}
              <h2 className="text-xl font-semibold text-gray-800">
                No Results found!
              </h2>
              <p className="text-gray-500 text-sm max-w-sm">
                There is nothing retated to your search. Try finding something else.
              </p>
        
              {/* Button */}
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-pink-50"
                onClick={() => navigate("/")}
              >
                Go to Home
              </Button>
            </div>
    )
}