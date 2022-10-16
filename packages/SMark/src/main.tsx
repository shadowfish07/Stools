import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Storage } from './utils/Storage'

const BaseApp = React.lazy(() => Storage.loadLocalData().then(() => {
  return import('./App')
}
))

export const SavingContext = React.createContext({
  isSaving: false,
  setIsSaving: (isSaving: boolean) => { }
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Suspense fallback={<div>Loading...</div>}>
      <BaseApp />
    </Suspense>
  </React.StrictMode>
)
