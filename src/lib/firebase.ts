import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDUB52FkZ1dzM1qy7RhHaQY04T7_oKD4QY",
  authDomain: "tpf-projekt-eeff2.firebaseapp.com",
  projectId: "tpf-projekt-eeff2",
  storageBucket: "tpf-projekt-eeff2.firebasestorage.app",
  messagingSenderId: "804943686132",
  appId: "1:804943686132:web:53e362f3b8e368fc4531a1",
  measurementId: "G-Y3JMG0XGBG",
} as const;

export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const firebaseAnalytics =
  typeof window === "undefined"
    ? null
    : (() => {
        try {
          return getAnalytics(firebaseApp);
        } catch {
          return null;
        }
      })();
