// Import Firebase Admin SDK
import admin from "firebase-admin";

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  // Ensure that the service account key is set in the environment
  const serviceAccount = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEYS;

  if (!serviceAccount) {
    throw new Error("Firebase service account key not found in environment variables.");
  }
  

  // Parse the service account key
  let parsedServiceAccount;
  try {
    parsedServiceAccount = JSON.parse(serviceAccount);
  } catch (error) {
    console.error("Error parsing Firebase service account keys:", error);
    throw new Error("Invalid service account key format.");
  }

  try {
    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: parsedServiceAccount.project_id,
        clientEmail: parsedServiceAccount.client_email,
        privateKey: parsedServiceAccount.private_key.replace(/\\n/g, "\n"),
        clientId: parsedServiceAccount.client_id,
        authUri: parsedServiceAccount.auth_uri,
        tokenUri: parsedServiceAccount.token_uri,
        authProviderX509CertUrl: parsedServiceAccount.auth_provider_x509_cert_url,
        clientCertsUrl: parsedServiceAccount.client_x509_cert_url,
        universeDomain: parsedServiceAccount.universe_domain,
        
      }),
      
    });
    
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw new Error("Firebase Admin initialization failed.");
  }
}

// Initialize Firestore only once
const adminDB = admin.firestore();

// Export Firebase Admin and Firestore instance
export { admin, adminDB };
