import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UseStorageReturnType } from "./hooks/useStorage";
import "./index.css";
import { Storage } from "./utils/Storage";

const BaseApp = React.lazy(() =>
  Storage.loadLocalData().then(() => {
    return import("./App");
  })
);

export const SavingContext = React.createContext({
  isSaving: false,
  setIsSaving: (isSaving: boolean) => {},
});

export const BookmarksContext = React.createContext<
  UseStorageReturnType<"bookmarks">
>(null as any);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Suspense fallback={<div>Loading...</div>}>
      <BaseApp />
    </Suspense>
  </React.StrictMode>
);
