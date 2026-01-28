import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader.json";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Lottie
        animationData={loaderAnimation}
        loop
        autoplay
        className="w-100 h-100"
      />
    </div>
  );
};

export default Loader;