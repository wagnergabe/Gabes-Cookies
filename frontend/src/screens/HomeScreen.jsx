import { Row, Col } from "react-bootstrap";
import Cookie from '../components/Cookie.jsx';
import cookies from '../cookies.js'

const HomeScreen = () => {
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