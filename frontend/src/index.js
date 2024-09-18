import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import CookieScreen from './screens/CookieScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
    <Route path='/' index={true} element={<HomeScreen />} />
    <Route path='/cookie/:id' element={<CookieScreen />} />
    <Route path='/cart' element={<CartScreen />} />
    <Route path='/login' element={<LoginScreen />} />
    <Route path='/register' element={<RegisterScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
