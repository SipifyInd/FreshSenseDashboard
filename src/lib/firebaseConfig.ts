import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv7A9dqOD0_gscPywfXvgI4Laycu544OM",
  authDomain: "freshsense-c0b36.firebaseapp.com",
  projectId: "freshsense-c0b36",
  storageBucket: "freshsense-c0b36.appspot.com",
  messagingSenderId: "652588566124",
  appId: "1:652588566124:web:7433405e2d16d4ecc03a49",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
