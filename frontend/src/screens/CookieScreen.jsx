import {useState, useEffect } from 'react';
import  { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from '../components/Rating.jsx';
import { useGetCookieDetailsQuery } from '../../slices/cookiesApiSlice.js';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../../slices/cartSlice'

const CookieScreen = () => {
    const { id: cookieId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1)

    const { data: cookie, isLoading, error } = useGetCookieDetailsQuery(cookieId);

    const addToCartHandler = () => {
      if (cookie && cookie._id) {  
          dispatch(addToCart({ ...cookie, qty }));
          navigate('/cart');
      } else {
          console.error('Failed to add cookie to cart: Invalid cookie data');
      }
  }
  
  return (
    <>
    <Link className = "btn btn-light my-3" to="/">Back</Link>

    
    { isLoading ? <Loader /> : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (<Row>
    <Col md={6}>
  <Image src={cookie.image} alt={cookie.name} className="cookie-image" />
</Col>
        <Col md={4}>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h3>{cookie.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value ={cookie.rating} text={`${cookie.numReviews}  reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>{cookie.description}</ListGroup.Item>
        </ListGroup>
        </Col>
        
        <Col md={2}>
          <Card className="p-2" style={{ height: 'auto', display: 'flex', justifyContent: 'center' }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${cookie.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
                <ListGroup.Item>
                    <button className="btn-block" type="button" onClick = {addToCartHandler} >Order</button>
                </ListGroup.Item>

                </ListGroup>
        </Card>
        </Col>
    </Row>)}

    
    </>
  )
}

export default CookieScreen