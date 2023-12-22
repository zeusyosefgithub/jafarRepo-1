import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLpkR3hDQxtXqEwndvodkEAtWtm1bFUrw",
  authDomain: "jafar-project.firebaseapp.com",
  projectId: "jafar-project",
  storageBucket: "jafar-project.appspot.com",
  messagingSenderId: "532692548037",
  appId: "1:532692548037:web:2e6acbca26bd172545f3ac",
  measurementId: "G-STHLVX5560"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const analytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app)
  } else {
    return null
  }
}
export const firestore = getFirestore(app);