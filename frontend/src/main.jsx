import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import HomeScreen from './screens/HomeScreen';
import CookieScreen from './screens/CookieScreen';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/cookie/:id" element={<CookieScreen />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
