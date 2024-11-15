import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { admin, adminDB } from "@/lib/firebase_admin";
import Link from "next/link";

const fetchCheckout = async (checkoutId) => {
  try {
    const list = await adminDB
      .collectionGroup("checkout_sessions_cod")
      .where("id", "==", checkoutId)
      .get();

    if (list.empty) {
      throw new Error("Invalid Checkout ID");
    }
    
    return list.docs[0].data();
  } catch (error) {
    console.error("Error fetching checkout session: ", error);
    throw error;  // Propagate error so the caller can handle it
    
  }
};

const processOrder = async ({ checkout }) => {
  try {
    const order = await adminDB.doc(`orders/${checkout?.id}`).get();
    if (order.exists) {
      return false;
    }

    const uid = checkout?.metadata?.uid;

    await adminDB.doc(`orders/${checkout?.id}`).set({
      checkout: checkout,
      payment: {
        amount: checkout?.line_items?.reduce((prev, curr) => {
          return prev + curr?.price_data?.unit_amount * curr?.quantity;
        }, 0),
      },
      uid: uid,
      id: checkout?.id,
      paymentMode: "cod",
      timestampCreate: admin.firestore.Timestamp.now(),
    });

    const productList = checkout?.line_items?.map((item) => {
      return {
        productId: item?.price_data?.product_data?.metadata?.productId,
        quantity: item?.quantity,
      };
    });

    const user = await adminDB.doc(`users/${uid}`).get();

    const productIdsList = productList?.map((item) => item?.productId);

    const newCartList = (user?.data()?.carts ?? []).filter(
      (cartItem) => !productIdsList.includes(cartItem?.id)
    );

    await adminDB.doc(`users/${uid}`).set(
      {
        carts: newCartList,
      },
      { merge: true }
    );

    const batch = adminDB.batch();

    productList?.forEach((item) => {
      batch.update(adminDB.doc(`products/${item?.productId}`), {
        orders: admin.firestore.FieldValue.increment(item?.quantity),
      });
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error processing order: ", error);
    throw error;  // Propagate error so the caller can handle it
  }
};

export default async function Page({ searchParams }) {
  const { checkout_id } = searchParams;
  let checkout;

  try {
    checkout = await fetchCheckout(checkout_id);
  } catch (error) {
    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Error: {error.message}
          </h1>
        </section>
        <Footer />
      </main>
    );
  }

  const result = await processOrder({ checkout });

  return (
    <main>
      <Header />
      <section
  className="min-h-screen flex flex-col gap-3 justify-center items-center"
  style={{
    backgroundImage: "url('/images/sasasa.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="flex justify-center w-full">
          <img src="/svgs/Mobile payments-rafiki.svg" className="h-48" alt="" />
        </div>
        <h1 className="text-2xl font-semibold text-green">
          Your Order Is{" "}
          <span className="font-bold text-green-600">Successfully</span> Placed
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <Link href={"/account"}>
          <button className="text-yellow-400 border border-black hover:bg-green-500 hover:cursor-pointer px-5 py-2 rounded-lg bg-red-500">
           Go To Orders Page</button></Link></div>
      </section>
      <Footer />
    </main>
  );
}
