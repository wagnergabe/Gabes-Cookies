import { Row, Col } from 'react-bootstrap';
import Cookies from '../components/Cookies';
import cookies from '../cookies';

function HomeScreen() {

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