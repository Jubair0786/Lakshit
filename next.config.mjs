/** @type {import('next').NextConfig} */
const nextConfig = {
    // You can include other Next.js config options here
  };
  
  const firebaseServiceKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  // If you're using the Firebase service key, you can log it or use it directly in your app
  if (!firebaseServiceKey) {
    console.error("Firebase service account key is missing in environment variables.");
  } else {
    console.log("Firebase service account key is set.");
  }
  
  export default nextConfig;
  