import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Cookie from "../components/Cookie.jsx";
import { useGetCookiesQuery } from "../slices/cookiesApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";

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
          {" "}
          <h1>Fresh Cookies</h1>
          <Row>
            {data.cookies.map((cookie) => (
              <Col key={cookie._id} sm={12} md={6} lg={4} xl={3}>
                <Cookie cookie={cookie} />
              </Col>
            ))}
          </Row>
          <Paginate pages = {data.pages} page = {data.page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
