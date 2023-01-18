import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postData = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    let data = {
      email,
      password,
    };
    dispatch(loginUser(data, navigate));
  };
  return (
    <Container className="d-flex align-items-center justify-content-center flex-direction-column mt-5">
      <Card
        style={{
          width: '500px',
          height: '500px',
          backgroundColor: '#FFFFFF',
          marginTop: '100px',
          borderRadius: '20px',
        }}
      >
        <Card.Body>
          <Card.Title className="text-primary d-flex align-items-center justify-content-center flex-direction-column">
            <h3>Login</h3>
          </Card.Title>
          <p className="mb-5">Hi, welcome back!</p>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <div
              style={{
                paddingBottom: '20px',
                paddingLeft: '320px',
              }}
            >
              <Link align="right" to="/forgotpassword">
                Forgot password?
              </Link>
            </div>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Login
              </Button>
            </div>
          </Form>
          <div className="py-4">
            <p className="text-center">
              Don't have an account <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
