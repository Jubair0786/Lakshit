import { Rating } from "@mui/material";

export default function CustomerReviews() {
  const list = [
    {
      name: "GOLDYY",
      message:
        "Goldyy Supplements is dedicated to providing premium, high-quality supplements that help you reach your fitness goals. Our mission is to deliver safe, effective, and scientifically-backed products that cater to every stage of your fitness journey. ",
      rating: 4.5,
      imageLink:
        "https://t4.ftcdn.net/jpg/05/66/23/45/360_F_566234573_0wRtGNCoV93vm3nCcBuRDIEJOq4BXlQ2.jpg",
    },
    {
      name: "JUBAIR",
      message:
        "We prioritize quality and transparency, ensuring that each product is crafted with the finest ingredients to support your health and performance. Trust Goldyy Supplements to be your partner in achieving optimal results.",
      rating: 5,
      imageLink:
        "https://t4.ftcdn.net/jpg/05/66/23/45/360_F_566234573_0wRtGNCoV93vm3nCcBuRDIEJOq4BXlQ2.jpg",
    },
    
  ];
  return (
    <section className="flex justify-center">
      <div
  className="overflow-hidden md:p-10 p-5"
  style={{
    backgroundImage: `url('/images/background.jpg')`, // Use the image from the public folder
    backgroundSize: 'cover', // Make sure the background image covers the whole div
    backgroundPosition: 'center', // Keep the image centered
     // Black background color for fallback and overlay effect
  }}
>
        <h1 className="text-center font-semibold text-xl text-red-600 shadow-sm ">
          Our customers love
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list?.map((item) => {
            return (
              <div className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center bg-gradient-to-r from-green-400 to-red-500 border">
                <img
                  src={item?.imageLink}
                  className="h-32 w-32 rounded-full object-cover"
                  alt=""
                />
                <h1 className="text-sm font-semibold">{item?.name}</h1>
                <Rating
                  size="small"
                  name="customer-rating"
                  defaultValue={item?.rating}
                  precision={item?.rating}
                  readOnly
                />
                <p className="text-sm text-black text-center">
                  {item?.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
