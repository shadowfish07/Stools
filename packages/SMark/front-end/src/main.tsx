import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const BaseApp = React.lazy(async () => {
  return await import("./App");
});

export const SavingContext = React.createContext({
  isSaving: false,
  setIsSaving: (isSaving: boolean) => {},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <Suspense fallback={<div>Loading...</div>}>
      <BaseApp />
    </Suspense> */}
  </React.StrictMode>
);
