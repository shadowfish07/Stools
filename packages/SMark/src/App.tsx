import { useState } from "react";
import { Button, Layout } from "@arco-design/web-react";
import Sider from "@arco-design/web-react/es/Layout/sider";
import { Category, Header, Content } from "./components";
import { SavingContext } from "./main";
import { WebApp } from "./pages";

function App() {
  const openNewPage = () => {
    chrome.tabs.create({
      url: "index.html?aa=1",
    });
  };

  const [isSaving, setIsSaving] = useState(false);

  return (
    <SavingContext.Provider value={{ isSaving, setIsSaving }}>
      <WebApp />
    </SavingContext.Provider>
  );
}

export default App;
