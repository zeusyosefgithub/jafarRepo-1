import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCLpkR3hDQxtXqEwndvodkEAtWtm1bFUrw",
  authDomain: "jafar-project.firebaseapp.com",
  projectId: "jafar-project",
  storageBucket: "jafar-project.appspot.com",
  messagingSenderId: "532692548037",
  appId: "1:532692548037:web:2e6acbca26bd172545f3ac",
  measurementId: "G-STHLVX5560"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyCfkkaERgAZphA_rqe9jOLNJxSXsmk2hEI",
//   authDomain: "jafar-test.firebaseapp.com",
//   projectId: "jafar-test",
//   storageBucket: "jafar-test.appspot.com",
//   messagingSenderId: "152756947668",
//   appId: "1:152756947668:web:4965c9e95185f07f86c941",
//   measurementId: "G-GRC408D5BL"
// };

const app = initializeApp(firebaseConfig);

export const analytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app)
  } else {
    return null
  }
}
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);