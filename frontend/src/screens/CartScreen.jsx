import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

export default function CartScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (cookie, qty) => {
        dispatch(addToCart({...cookie, qty}))
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('login?redirect=/shipping')
    }

  return (
    <Row>
        <Col md={8}>
            <h1 style = {{marginBottom: '20px'}}>Shopping Cart</h1>
            { cartItems.length === 0 ? (
                <Message>
                    Your cart is empty. <Link to='/'>Go Get some Cookies!</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    { cartItems.map((item) => (
                        <ListGroup.Item key={ item._id }>
                            <Row>
                                <Col md={5} sm={1}>
                                    <Image src={item.image} alt={item.name}  style={{ width: '100px', height: '100px', objectFit: 'cover' }} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                <Link to={`/cookie/${item._id}`}>{ item.name}</Link>
                                </Col>
                                <Col md={2}>${item.price}
                                </Col>
                                <Col md={2}>
                                    <button type="button" variant='light' onClick = {() => removeFromCartHandler(item._id)}>
                                        <FaTrash/>
                                    </button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Subtotal:  ${ cartItems.reduce((a,b) => a + b.price, 0).toFixed(2)} </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type = "button" className="btn-block" disabled={ cartItems.length === 0} onClick={() => checkoutHandler()}>
                        Proceed to Checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
    </Row>
  )
}
