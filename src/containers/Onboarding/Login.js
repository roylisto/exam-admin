import React, { Component } from 'react'
import {
    Row, Col, Form, Button, Image, Alert
} from 'react-bootstrap'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
             showError : false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id] : e.target.value,
            showError : false
        })
    }


    handleLogin(e) {
        e.preventDefault();
        this.setState({
            showError : true
        })
        console.log(this.state.emailAdmin);
        console.log(this.state.passwordAdmin);
        
    }
    
    render() {
        return (
            <Row id="login-container">
                <Col>
                    <Image 
                        src="https://cdn.zeplin.io/5f281c5cde10f72079056c76/assets/ebf99d37-084c-42fd-a465-273925f310b0.png"
                    />
                </Col>
                <Col className="d-flex align-items-center">
                    <Form id="form-login">
                        <p>Welcome to Admin Page</p>
                        <h3>Login To your Account</h3>
                        {
                            (this.state.showError) ? 
                                <Alert>
                                    Login Gagal !
                                </Alert>
                            : ""
                        }
                        <Form.Group>
                            <Form.Control 
                                id="emailAdmin"
                                type="email" 
                                placeholder="Email"
                                onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                id="passwordAdmin"
                                type="password" 
                                placeholder="Password"
                                onChange={this.handleChange}
                                />
                        </Form.Group>
                        <Button 
                            className="btn-admin pink"
                            onClick={this.handleLogin}>
                            LOG IN
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default Login
