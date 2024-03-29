import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';


const Header = ({ setSearch }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const logoutHandler = () => {
        dispatch(logout());
        navigate("/")
    }

    console.log(userInfo);

    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container >
                <Navbar.Brand >
                    <Link>Note Zipper</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>

                        <Form >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    <Nav>
                        {userInfo ? (<>
                            <Nav.Link href='/mynotes'>
                                My Notes
                            </Nav.Link>
                            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;