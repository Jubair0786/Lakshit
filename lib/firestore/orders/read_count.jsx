"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
  Timestamp,
} from "firebase/firestore";
import useSWR from "swr";

// Function to get orders count and total revenue
export const getOrdersCounts = async ({ date }) => {
  const ref = collection(db, `orders`);
  let q = query(ref);

  if (date) {
    const fromDate = new Date(date);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(date);
    toDate.setHours(23, 59, 59, 999); // Full day until the end of the day

    q = query(
      ref,
      where("timestampCreate", ">=", Timestamp.fromDate(fromDate)),
      where("timestampCreate", "<=", Timestamp.fromDate(toDate))
    );
  }

  // Get documents
  const snapshot = await getDocs(q);
  const totalOrders = snapshot.size;

  // Calculate total revenue by iterating over documents (since Firestore doesn't have aggregation queries)
  let totalRevenue = 0;
  snapshot.forEach((doc) => {
    const paymentAmount = doc.data().payment?.amount || 0;
    totalRevenue += paymentAmount;
  });

  if (date) {
    return {
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      data: { totalOrders, totalRevenue },
    };
  }

  return { totalOrders, totalRevenue };
};

// Function to get total orders count by multiple dates
const getTotalOrdersCounts = async (dates) => {
  let promisesList = [];
  for (let i = 0; i < dates?.length; i++) {
    const date = dates[i];
    promisesList.push(getOrdersCounts({ date }));
  }
  const list = await Promise.all(promisesList);
  return list;
};

// Hook to get orders count for the current day or all-time if no date is passed
export function useOrdersCounts() {
  const { data, error, isLoading } = useSWR("orders_counts", () =>
    getOrdersCounts({ date: null })
  );

  if (error) {
    console.error(error.message);
  }

  return { data, error, isLoading };
}

// Hook to get orders count for multiple days
export function useOrdersCountsByTotalDays({ dates }) {
  const { data, error, isLoading } = useSWR(
    ["orders_count", dates],
    ([, dates]) =>
      getTotalOrdersCounts(dates?.sort((a, b) => a.getTime() - b.getTime()))
  );

  if (error) {
    console.error(error.message);
  }

  return { data, error, isLoading };
}
