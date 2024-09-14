import { Row, Col } from "react-bootstrap";
import Cookie from '../components/Cookie.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomeScreen = () => {

  const [cookies, setCookies] = useState([]);

  
  useEffect(() => {
    const fetchCookies = async () => {
      const { data } = await axios.get('/api/cookies');
      setCookies(data);
    }

    fetchCookies();
  }, []);

  return (
    <>
        <h1>Fresh Cookies</h1>
        <Row>
            {cookies.map((cookie) => (
            <Col key={cookie._id} sm={12} md={6} lg={4} xl={3}>
                <Cookie cookie={cookie} />
            </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen