import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId="60270378822-a6fo654j5bkgo8hev8nregsbc55kl9lt.apps.googleusercontent.com"
      disableOneTap   
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
