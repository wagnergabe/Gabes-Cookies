import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Provider }  from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import CookieScreen from './screens/CookieScreen';
import CartScreen from './screens/CartScreen';
import store from './store';
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
      <Route path="/cart" element={<CartScreen />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <RouterProvider router={router} />
   </Provider>
  </StrictMode>,
)
