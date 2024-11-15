"use client";

import Link from "next/link";
import Slider from "react-slick";

export default function Categories({ categories }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (categories.length === 0) {
    return null; // Instead of an empty fragment, return null for better readability
  }

  return (
    <div
  className="overflow-hidden md:p-10 p-5"
  style={{
    backgroundImage: `url('/images/background.jpg')`, // Use the image from the public folder
    backgroundSize: 'cover', // Make sure the background image covers the whole div
    backgroundPosition: 'center', // Keep the image centered
     // Black background color for fallback and overlay effect
  }}
>
      <div className="flex justify-center w-full">
        <h1 className="text-lg font-semibold shadow-sm text-black">
          Shop By Category
        </h1>
      </div>
      <Slider {...settings}>
        {(categories?.length <= 2
          ? [...categories, ...categories, ...categories] // Tripling the categories for small lists
          : categories
        )?.map((category, index) => {
          return (
            <Link href={`/categories/${category?.id}`} key={category?.id || index}> {/* Fallback to index if no id */}
              <div className="px-2">
                <div className="flex flex-col gap-2 items-center justify-center text-red-600">
                  <div className="md:h-32 md:w-32 h-24 w-24 rounded-full bg-gradient-to-b from-red-600 via-yellow-400 to-green-600 md:p-5 p-2 border overflow-hidden">
                    <img 
                      src={category?.imageURL} 
                      alt={category?.name || "Category image"} // Provide a meaningful alt text
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <h1 className="font-semibold text-black">{category?.name}</h1>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
