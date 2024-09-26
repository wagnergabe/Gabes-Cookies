import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaCookieBite } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall();
            dispatch(logout());
            dispatch(resetCart());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

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
                    {
                        userInfo ? (<>
                            <FaCookieBite style ={{marginTop: '13px', marginLeft: '5px'}}/>
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item> Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        </>
                        ) : (
                            <LinkContainer to="/login"><Nav.Link>
                            <FaUser /> Sign In
                            </Nav.Link></LinkContainer>
                        )
                    }
                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="adminmenu">
                            <LinkContainer to="/admin/cookielist">
                                <NavDropdown.Item> Cookies</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/orderlist">
                                <NavDropdown.Item> Orders</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/userlist">
                                <NavDropdown.Item> Users</NavDropdown.Item>
                            </LinkContainer>
                            
                        </NavDropdown>
                    )}
                    </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
};

export default Header;