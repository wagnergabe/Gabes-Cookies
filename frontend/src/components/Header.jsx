import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    console.log('Cart Items:', cartItems);
    return (
        <header>
        <Navbar  expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Gabe's Cookies</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <LinkContainer to="/cart"><Nav.Link>
                    <FaShoppingCart /> Cart
                    {
                        cartItems.length > 0 && (
                            <Badge pill bg="info" style={{marginLeft: '5px'}}> 
                            { cartItems.reduce((a, b) => a + b.qty, 0)}
                            </Badge>
                        )
                    }
                    </Nav.Link></LinkContainer>
                    <LinkContainer to="/login"><Nav.Link>
                    <FaUser /> Sign In
                    </Nav.Link></LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
};

export default Header;