import { Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Header/Loading";
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';



const RegisterScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    let navigate = useNavigate();


    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {

        if (userInfo) {
            navigate("/mynotes");
        }
    });

    const submitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(name, email, password))

        }
    }
    console.log(email);


    return (
        <MainScreen title='Register'>
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Name</Form.Label>
                        <Form.Control type="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>

                    {/* 
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control id="custom-file"
                            type="image/png"
                            label="Upload Profile Picture"
                            custom />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>

        </MainScreen>
    )
}


export default RegisterScreen;