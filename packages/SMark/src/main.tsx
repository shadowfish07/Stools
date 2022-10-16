import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UseStorageReturnType, UseConfigReturnType } from "./hooks";
import "./index.css";
import { Storage } from "./utils/Storage";

const BaseApp = React.lazy(async () => {
  await Storage.loadLocalConfig();
  await Storage.loadLocalData();
  return await import("./App");
});

export const SavingContext = React.createContext({
  isSaving: false,
  setIsSaving: (isSaving: boolean) => {},
});

export const BookmarksContext = React.createContext<
  UseStorageReturnType<"bookmarks">
>(null as any);

export const ConfigContext = React.createContext<UseConfigReturnType>(
  null as any
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Suspense fallback={<div>Loading...</div>}>
      <BaseApp />
    </Suspense>
  </React.StrictMode>
);
