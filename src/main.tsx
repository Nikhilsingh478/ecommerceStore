import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

if ("serviceWorker" in navigator) {
  registerSW({
    onNeedRefresh() {
      console.log('New version available');
    },
    onOfflineReady() {
      console.log('App ready for offline use');
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
