import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig, isFirebaseConfigured } from "../config/env";

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
