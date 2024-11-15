"use client";
import { GiShop } from "react-icons/gi";
import Link from "next/link";
import Slider from "react-slick";

export default function Collections({ collections }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (collections.length === 0) {
    return <></>;
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
      <Slider {...settings}>
        {(collections?.length <= 2
          ? [...collections, ...collections, ...collections]
          : collections
        )?.map((collection) => {
          return (
            <div className="px-2" key={collection.id}> {/* Added key here */}
              <div className="flex gap-4 bg-gradient-to-tr to-red-400 from-green-400 p-7 w-full rounded-xl h-full">
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-col gap-4">
                    <h1 className="md:text-lg text-base font-semibold">
                      {collection?.title}
                    </h1>
                    <h1 className="text-black text-xl md:text-sm max-w-96 line-clamp-2">
                      {collection?.subTitle}
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/collections/${collection?.id}`}>
                      <button className="bg-black text-green-400 text-opacity-100 text-nowrap md:text-sm px-4 py-2 rounded-lg shadow-lg shadow-black">
                         <GiShop/>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full">
                  <img
                    className="h-[4rem] md:h-[9rem]"
                    src={collection?.imageURL}
                    alt={collection?.title}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
