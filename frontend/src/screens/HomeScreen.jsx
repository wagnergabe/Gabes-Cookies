import { Row, Col } from 'react-bootstrap';
import Cookies from '../components/Cookies';
import { useGetCookiesQuery } from '../../slices/cookiesApiSlice.js'
import Loader  from '../components/Loader.jsx';
import Message from '../components/Message.jsx'


// import cookies from '../cookies';


function HomeScreen() {
  const { data: cookies, isLoading, error } = useGetCookiesQuery();

  return (
    <>
    { isLoading ? <Loader />: error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (<><h1>Cookies</h1>
    <Row>
        {cookies.map((cookie) => {
            return (
            <Col key={cookie._id} sm={12} md={6} lg={4} xl ={3}>
                <Cookies cookie = {cookie} />
                </Col>
            );
        })}
    </Row></>)} 
    
    </>
  );
}

export default HomeScreen;