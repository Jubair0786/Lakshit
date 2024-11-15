"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaBackward } from "react-icons/fa";

export default function FeaturedProductSlider({ featuredProducts }) {
  const [currentBackground, setCurrentBackground] = useState(0);

  // Background images (default)
  const backgroundImages = [
    "/images/background1.jpg",
    "/images/background1.jpg",
    "/images/background1.jpg"
    
  ];

  // Use featuredProducts if available, else fallback to defaultImages
  const isFeaturedProductsAvailable = featuredProducts?.length > 0;
  const productsToShow = isFeaturedProductsAvailable ? featuredProducts : [];

  // Cycle through background images automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Manually change the background image
  const handlePrevBackground = () => {
    setCurrentBackground((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleNextBackground = () => {
    setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImages[currentBackground]})` }}
      />

      {/* Scrolling Advertisement Text */}
      <div className="absolute top-4 left-0 right-0 z-10 shadow-lg shadow-green-700 p-2 text-center text-red-600 font-bold">
        <div className="whitespace-nowrap animate-marquee">
          Exclusive Offer: Get 20% Off Your First Purchase! Shop Now
          
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button onClick={handlePrevBackground} className="text-red-600 p-2 rounded-full">
          <FaBackward />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button onClick={handleNextBackground} className="text-red-600 p-2 rounded-full">
          <TbPlayerTrackNextFilled />
        </button>
      </div>

      {/* Slider Component */}
      {isFeaturedProductsAvailable ? (
        <Slider {...settings} className="relative z-10">
          {productsToShow.map((product) => (
            <div key={product.id}>
              <div className="flex flex-col-reverse md:flex-row gap-4 bg-opacity-80 p-5 md:px-24 md:py-20 w-full">
                <div className="flex-1 flex flex-col md:gap-10 gap-4 z-10">
                  <h2 className="text-red-500 text-xs md:text-base">NEW FASHION</h2>
                  <div className="flex flex-col gap-4">
                    <Link href={`/products/${product?.id}`}>
                      <h1 className="md:text-4xl text-xl font-semibold text-red-700">
                        {product?.title}
                      </h1>
                    </Link>
                    <h1 className="text-green-600 md:text-sm text-xs max-w-96 line-clamp-2">
                      {product?.shortDescription}
                    </h1>
                  </div>
                  <AuthContextProvider>
                    <div className="flex items-center gap-4">
                      <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                        <button className="bg-green-500 text-red-900 text-xs md:text-sm px-4 py-1.5 rounded-lg">
                          BUY NOW
                        </button>
                      </Link>
                      <AddToCartButton productId={product?.id} type="large" />
                      <FavoriteButton productId={product?.id} />
                    </div>
                  </AuthContextProvider>
                </div>
                <div>
                  <Link href={`/products/${product?.id}`}>
                    <img
                      className="h-[14rem] md:h-[23rem]"
                      src={product?.featureImageURL}
                      alt="Product Image"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="relative z-10 flex items-center justify-center h-[23rem]">
          
            
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
