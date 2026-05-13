export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const analyticsConfig = {
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "G-EPV1414MV4",
  hotjarSiteId: import.meta.env.VITE_HOTJAR_SITE_ID,
  contentsquareTagId: import.meta.env.VITE_CONTENTSQUARE_TAG_ID || "529ebf7774b06",
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);
