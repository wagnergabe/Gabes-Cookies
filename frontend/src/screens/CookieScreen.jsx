import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Row, Col, Form, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { useGetCookieDetailsQuery } from '../slices/cookiesApiSlice';
import { addToCart } from '../slices/cartSlice';


const CookieScreen = () => {

    const { id: cookieId } = useParams();
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [qty, setQty] = useState(1);
    const { data: cookie, isLoading, error } = useGetCookieDetailsQuery(cookieId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...cookie, qty}))
        navigate('/cart');
    }
    return (
        <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>

        { isLoading ? (<Loader />) : error ? (
           <Message variant="danger">
           { error?.data.message || error.error}
         </Message>
        ) : (<Row>
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

                        {cookie.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                       <Form.Control
                                       as='select'
                                       value={qty}
                                       onChange={(e) => setQty(Number(e.target.value))}>
                                        {[...Array(cookie.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        )
                                        )}
                                       </Form.Control>

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={cookie.countInStock === 0} onClick={addToCartHandler}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>) }
        
        </>
    );
    };

export default CookieScreen;