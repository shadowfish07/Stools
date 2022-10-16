import { useState } from "react";
import { Button, Layout } from "@arco-design/web-react";
import Sider from "@arco-design/web-react/es/Layout/sider";
import { Category, Header, Content } from "./components";
import { BookmarksContext, SavingContext } from "./main";
import { WebApp } from "./pages";
import { useStorage } from "./hooks";

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

  return (
    <SavingContext.Provider value={{ isSaving, setIsSaving }}>
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
    </SavingContext.Provider>
  );
}

export default App;
