import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating'; // Assuming you have a Rating component

const Cookies = ({ cookie }) => {
  return (
    <Card className="my-3 p-3 rounded h-100 shadow">
      <Link to={`/cookie/${cookie._id}`}>
        <Card.Img src={cookie.image} variant="top" className="card-img" />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/cookie/${cookie._id}`}>
          <Card.Title as="div" className="cookie-title">
            <strong>{cookie.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="flex-grow-1">
          <Rating value={cookie.rating} text={`${cookie.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3" className="mt-auto">
          ${cookie.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cookies;
