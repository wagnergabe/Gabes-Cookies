import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet }  from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {
  

  return (
    <>
    <Header />
    <main className="py-0">
      <Container>
      <Outlet />
      </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
