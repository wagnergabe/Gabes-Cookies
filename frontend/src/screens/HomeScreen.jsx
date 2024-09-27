import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Cookie from "../components/Cookie.jsx";
import { useGetCookiesQuery } from "../slices/cookiesApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";
import Meta from "../components/Meta"
import logo from '../assets/logo.png'


const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetCookiesQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
      <Meta title="Welcome to my Cookie Shop" description="Homemade cookies for everyone" />

<Row className="justify-content-center">
  <Col xs="auto">
    <img src={logo} alt="logo" width="300" className="rounded" />
  </Col>
</Row>
<h2>Current Cookies</h2>
<Row>
  {data.cookies.map((cookie) => (
    <Col className="d-flex justify-content-center" key={cookie._id} sm={12} md={6} lg={4} xl={3}>
      <Cookie cookie={cookie} />
    </Col>
  ))}
</Row>
<Paginate pages={data.pages} page={data.page} />

        </>
      )}
    </>
  );
};

export default HomeScreen;
