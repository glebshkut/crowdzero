import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Web3Provider } from "./components/app/Web3Provider.tsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Web3Provider>
    <App />
  </Web3Provider>
)
