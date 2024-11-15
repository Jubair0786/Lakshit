"use client";
import React, { useState, useEffect } from "react";
import { getProducts } from "@/lib/firestore/products/read_server";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import { FiLoader } from "react-icons/fi";
import { ProductCard } from "@/app/components/Products";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
  className="p-4 md:p-10 bg-cover bg-center"
  style={{
    backgroundImage: `url('/images/background.jpg')`, // Use the image from the public folder
  }}
>
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border text-red-600 bg-yellow-300 rounded-2xl shadow-lg shadow-green-500 focus:outline-none focus:border-red-500"
      />

      <div className="mt-6">
        {filteredProducts.length > 0 ? (
          <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="p-1 border rounded-sm shadow-lg bg-gradient-to-b from-red-400 via-white to-green-500 flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {product.title}
                  <AuthContextProvider>
                    <FavoriteButton productId={product?.id} />
                  </AuthContextProvider>
                </h3>

                <div className="flex justify-center items-center">
                  <img
                    src={product.imageList}
                    alt={product.title}
                    className="w-full h-auto rounded-md object-cover"
                    style={{
                      maxHeight: "120px",
                      minHeight: "120px",
                      width: "100%",
                    }}
                  />
                </div>

                <h2 className="text-black text-sm line-clamp-2 md:line-clamp-2">
                  {product?.shortDescription}
                </h2>

                <h3 className="text-green-500 font-bold text-lg">
                  ₹ {product?.salePrice}{" "}
                  <span className="line-through text-gray-700 text-sm">
                    ₹ {product?.price}
                  </span>
                </h3>
                

                {/* Responsive Buttons Row */}
                <div className="flex flex-wrap justify-between items-center mt-2 gap-2 w-full">
                  <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                    <button className="bg-red-700 text-white rounded-lg px-4 py-1.5 flex-1 w-full">
                      Buy Now
                    </button>
                  </Link>

                  <AuthContextProvider>
                    <AddToCartButton
                      type={"cute"}
                      productId={product?.id}
                      className="flex-1 w-full"
                    />
                  </AuthContextProvider>
                </div>

                {product?.stock <= (product?.orders ?? 0) && (
                  <div className="flex mt-2">
                    <h3 className="text-red-900 py-1 rounded-lg text-sm font-semibold">
                      Out Of Stock
                    </h3>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-red-500 gap-2">
            <FiLoader className="animate-spin mr-2 text-lg" /> Loading...
          </p>
        )}

        <div className="w-full flex justify-center mt-8">
          <div className="flex flex-col gap-5 max-w-[900px] p-5">
            <h1 className="text-center text-red-600 font-semibold text-lg">
              Related Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products?.map((item) => (
                <ProductCard product={item} key={item?.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
