import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your actual Firebase config
// Go to https://console.firebase.google.com/ to create a project
const firebaseConfig = {
  apiKey: "AIzaSyDQ54Jr0ueFqPi1viqVOwNT1sIx-WsT_GU",
  authDomain: "bogchatop.firebaseapp.com",
  projectId: "bogchatop",
  storageBucket: "bogchatop.firebasestorage.app",
  messagingSenderId: "244857974110",
  appId: "1:244857974110:web:4c34adca8949a5a9ac73cf",
  measurementId: "G-4294CT4XRY"
};

// Only initialize if we have a real config, otherwise we'll mock auth for demonstration
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let app, auth, provider;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}

export { auth, provider, isConfigured };
