import { useParams } from "react-router-dom";
import cookies from '../cookies';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';

const CookieScreen = () => {
    const { id: cookieId } = useParams();
    const cookie = cookies.find((cookie) => cookie._id === cookieId);
  
    return (
        <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <Row>
            <Col md={3}> 
                <Image src={cookie.image} alt={cookie.name} className="card-image"/>
            </Col>
            <Col>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>{cookie.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={cookie.rating} text={`${cookie.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${cookie.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    {cookie.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>${cookie.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{cookie.countInStock > 0 ? 'Ready to bake' : 'Don\'t wanna bake this'}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={cookie.countInStock === 0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    );
    };

export default CookieScreen;