import { Card } from  'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Cookie = ({ cookie }) => {
  return (
    <Card className='my-3 p-3 rounded card-custom'>
        <Link to={`/cookie/${cookie._id}`}>
        <Card.Img src={cookie.image} variant='top' />
        </Link>

        <Card.Body>
            <Link to={`/cookie/${cookie._id}`}>
            <Card.Title as='div'>
                <strong>{cookie.name}</strong>
            </Card.Title>
            </Link>

            <Card.Text as='div'>
                <Rating value={cookie.rating} text={`${cookie.numReviews} reviews`} />
            </Card.Text>

            <Card.Text as='div'>
                <div className='my-3'>
                    {cookie.rating} from {cookie.numReviews} reviews
                </div>
            </Card.Text>

            <Card.Text as='h3'>
                ${cookie.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Cookie;