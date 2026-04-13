import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const reg of registrations) {
      reg.update();
    }
  });

  registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
  });
}

createRoot(document.getElementById("root")!).render(<App />);
