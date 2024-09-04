import {useState, useEffect } from 'react';
import  { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating.jsx';
import { useGetCookieDetailsQuery } from '../../slices/cookiesApiSlice.js';
import Loader from '../components/Loader'
import Message from '../components/Message'

const CookieScreen = () => {
    const { id: cookieId } = useParams();

    const { data: cookie, isLoading, error } = useGetCookieDetailsQuery(cookieId);
  
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
                    <button className="btn-block" type="button" >Order</button>
                </ListGroup.Item>

                </ListGroup>
        </Card>
        </Col>
    </Row>)}

    
    </>
  )
}

export default CookieScreen