import { Row, Col } from "react-bootstrap";
import Cookie from '../components/Cookie.jsx';
import { useGetCookiesQuery } from '../slices/cookiesApiSlice.js';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';

const HomeScreen = () => {
const {data: cookies, isLoading, error} = useGetCookiesQuery();

  return (
    <>
    { isLoading ? (
        <Loader />
    ) : error ? (<Message variant="danger">
      { error?.data.message || error.error}
    </Message>) : (<> <h1>Fresh Cookies</h1>
        <Row>
            {cookies.map((cookie) => (
            <Col key={cookie._id} sm={12} md={6} lg={4} xl={3}>
                <Cookie cookie={cookie} />
            </Col>
            ))}
        </Row></>) }
       
    </>
  )
}

export default HomeScreen