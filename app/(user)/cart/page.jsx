"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TbMarquee } from "react-icons/tb";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });
  if (isLoading) {
    return (
      <div className="p-10 flex w-full justify-center ">
        <CircularProgress />
      </div>
    );
  }
  return (
    <main
  className="flex flex-col gap-3 justify-center items-center p-5"
  style={{
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20231006/pngtree-3d-illustration-of-an-empty-shopping-cart-for-online-shopping-image_13546946.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      {(!data?.carts || data?.carts?.length === 0) && (
        <div className="flex flex-col gap-5 justify-center items-center  py-20">
          <div className="flex justify-center">
            <img className="h-[300px]" src="/svgs/Empty-pana.svg" alt="" />
          </div><marquee>
          <h1 className="text-green-600 font-semibold">
             Please online shopping from Purchasey
          </h1></marquee>
        </div>
      )}
      <div className="p-4 w-full md:max-w-[500px] rounded-2xl gap-5 hover:bg-yellow-500 hover:scale-100 shadow-lg shadow-green-600 bg-gradien-to-r from-green-400 via-yellow-500 to-red-500 ">
      <Link href={"/"}>
      <h1 className="text-green-600  font-semibold text-center">
            Please Add Products To Cart
          </h1>
      </Link>
        {data?.carts?.map((item, key) => {
          return <ProductItem item={item} key={item?.id} />;
        })}
      </div>
      <div>
        <Link href={`/checkout?type=cart`}>
          <button className="bg-green-500 shadow-lg shadow-red-500 px-5 py-2 text-sm rounded-lg text-red-900">
            Checkout
          </button>
        </Link>
      </div>
    </main>
  );
}

function ProductItem({ item }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: product } = useProduct({ productId: item?.id });

  const handleRemove = async () => {
    if (!confirm("Are you sure?")) return;
    setIsRemoving(true);
    try {
      const newList = data?.carts?.filter((d) => d?.id != item?.id);
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsRemoving(false);
  };

  const handleUpdate = async (quantity) => {
    setIsUpdating(true);
    try {
      const newList = data?.carts?.map((d) => {
        if (d?.id === item?.id) {
          return {
            ...d,
            quantity: parseInt(quantity),
          };
        } else {
          return d;
        }
      });
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsUpdating(false);
  };

  return (
    <div className="flex gap-3 items-center  px-3 py-3 bg-white rounded-xl">
      <div className="h-14 w-14 p-1 drop-shadow-lg bg-gradient-to-r from-green-400 to-red-500 ">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={product?.featureImageURL}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-sm font-semibold">{product?.title}</h1>
        <h1 className="text-red-500 text-sm">
          ₹ {product?.salePrice}{" "}
          <span className="line-through text-xs text-gray-500">
            ₹ {product?.price}
          </span>
        </h1>
        <div className="flex text-xs items-center gap-2">
          <Button
            onClick={() => {
              handleUpdate(item?.quantity - 1);
            }}
            isDisabled={isUpdating || item?.quantity <= 1}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Minus size={12} />
          </Button>
          <h2>{item?.quantity}</h2>
          <Button
            onClick={() => {
              handleUpdate(item?.quantity + 1);
            }}
            isDisabled={isUpdating}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Plus size={12} />
          </Button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Button
          onClick={handleRemove}
          isLoading={isRemoving}
          isDisabled={isRemoving}
          isIconOnly
          color="danger"
          size="sm"
        >
          <X size={13} />
        </Button>
      </div>
    </div>
  );
}
