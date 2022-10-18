import { useEffect, useState } from "react";
import { Button, Layout } from "@arco-design/web-react";
import Sider from "@arco-design/web-react/es/Layout/sider";
import { Category, Header, Content } from "./components";
import { SavingContext } from "./main";
import { WebApp } from "./pages";
import { useConfigState } from "./store/useConfigState";
import { useDataState } from "./store/useDataState";

function App() {
  const openNewPage = () => {
    chrome.tabs.create({
      url: "index.html?aa=1",
    });
  };

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadLocalConfig = useConfigState((state) => state.loadLocalConfig);
  const loadLocalData = useDataState((state) => state.loadLocalData);

  useEffect(() => {
    const loadPromises = [loadLocalConfig(), loadLocalData()];
    Promise.all(loadPromises).then(() => {
      setLoading(false);
    });
  }, []);

  // TODO 传入App，内部支持骨架屏渲染
  if (loading) return <div>Loading...</div>;

  return (
    <SavingContext.Provider value={{ isSaving, setIsSaving }}>
      <WebApp />
    </SavingContext.Provider>
  );
}

export default App;
