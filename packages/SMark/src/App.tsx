import { useState } from 'react'
import { Button, Layout } from '@arco-design/web-react'
import Content from '@arco-design/web-react/es/Layout/content'
import Sider from '@arco-design/web-react/es/Layout/sider'
import { Category, Header } from './components'
import { SavingContext } from './main'

function App() {
  const openNewPage = () => {
    chrome.tabs.create({
      url: 'index.html?aa=1'
    });
  }

  const [isSaving, setIsSaving] = useState(false)

  const BaseLayout = () => <Layout style={{ height: "100%" }}>
    <Sider ><Category /></Sider>
    <Layout>
      <Header />
      <Content>Content</Content>
    </Layout>
  </Layout>

  return (
    <SavingContext.Provider value={{ isSaving, setIsSaving }}>
      <BaseLayout />
    </SavingContext.Provider>
  )
}

export default App
