"use client";

import { ProductCard } from "@/app/components/Products";
import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import { MdOutlineFavorite } from "react-icons/md";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });
  if (isLoading) {
    return (
      <div className="p-10 flex w-full justify-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <main
  className="flex flex-col gap-3 justify-center items-center p-5 bg-black"
  style={{
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgQzETa_YMaM4eOk-o1sz--e3apQ7Az_unmVl6YLvjFS0ibyQqDLJqmaFaGOiOdmsYhts&usqp=CAU")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      <h1 className="text-2xl font-semibold text-pink-500"><MdOutlineFavorite className="text-6xl"/></h1>
      {(!data?.favorites || data?.favorites?.length === 0) && (
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <Link href={"/"} className=" shadow-lg h-100 w-100 rounded-2xl hover:bg-yellow-500 hover:scale-100 shadow-green-700">
        <hi className="text-center text-2xl font-semibold text-green-600">GO TO HOME</hi>
          </Link>
         <marquee>
          <h1 className="text-green-600 font-semibold">
            Please Add Products To Favorites
          </h1>
          </marquee>
        </div>
      )}
      <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4">
        {data?.favorites?.map((productId) => {
          return <ProductItem productId={productId} key={productId} />;
        })}
      </div>
    </main>
  );
}

function ProductItem({ productId }) {
  const { data: product } = useProduct({ productId: productId });
  return <ProductCard product={product} />;
}
