import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Cookies from '../components/Cookies';
import axios from 'axios';

// import cookies from '../cookies';


function HomeScreen() {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/cookies'); 
        setCookies(data);
      } catch (error) {
        console.error('Error fetching cookies:', error);
      }
    };

    fetchCookies();
  }, []);
  return (
    <>
    <h1>Cookies</h1>
    <Row>
        {cookies.map((cookie) => {
            return (
            <Col key={cookie._id} sm={12} md={6} lg={4} xl ={3}>
                <Cookies cookie = {cookie} />
                </Col>
            );
        })}
    </Row>
    </>
  );
}

export default HomeScreen;