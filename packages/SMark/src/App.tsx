import { useState } from "react";
import { Button, Layout } from "@arco-design/web-react";
import Sider from "@arco-design/web-react/es/Layout/sider";
import { Category, Header, Content } from "./components";
import { BookmarksContext, ConfigContext, SavingContext } from "./main";
import { WebApp } from "./pages";
import { useConfig, useStorage } from "./hooks";

function App() {
  const openNewPage = () => {
    chrome.tabs.create({
      url: "index.html?aa=1",
    });
  };

  const [isSaving, setIsSaving] = useState(false);
  const {
    data: bookmarks,
    updateData: updateBookmarksData,
    updateField: updateBookmarksField,
    updateRecord: updateBookmarksRecord,
  } = useStorage({ useKey: "bookmarks" });

  const [config, setConfig] = useConfig();

  return (
    <SavingContext.Provider value={{ isSaving, setIsSaving }}>
      <ConfigContext.Provider value={[config, setConfig]}>
        <BookmarksContext.Provider
          value={{
            data: bookmarks,
            updateData: updateBookmarksData,
            updateField: updateBookmarksField,
            updateRecord: updateBookmarksRecord,
            isSaving,
          }}
        >
          <WebApp />
        </BookmarksContext.Provider>
      </ConfigContext.Provider>
    </SavingContext.Provider>
  );
}

export default App;
