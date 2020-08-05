import React, { Component } from 'react'
import {
    Row, Col, Form, Button, Image, Alert
} from 'react-bootstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
    color: #ff8080;
    img {
        width: 100%;
    }
    .row {
        max-width: 100%;
        max-height: 100vh;
        overflow: hidden;
    }
`;

const ContentForm = styled.div`
    padding-left: 80px;
    p {
        margin-bottom: 7.5px;
    }
    h3 {
        color: #839dcf;
    }
`;

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailAdmin : '',
            passwordAdmin : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.token !== this.props.token && this.props.token !== ""){
            this.props.history.push("/dashboard")
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value,
            showError: false
        })
    }

    handleLogin(e) {
        e.preventDefault();
        const payload = {
            email : this.state.emailAdmin,
            password : this.state.passwordAdmin
        }
        this.props.login(payload);
    }

    render() {
        return (
            <Container>
                <Row id="login-container">
                    <Col>
                        <Image
                            src="https://cdn.zeplin.io/5f281c5cde10f72079056c76/assets/ebf99d37-084c-42fd-a465-273925f310b0.png"
                        />
                    </Col>
                    <Col className="d-flex align-items-center">
                        <ContentForm>
                            <p>Welcome to Admin Page</p>
                            <h3>Login To your Account</h3>
                            {
                                (this.props.error) ?
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
                                    onChange={this.handleChange} 
                                    required/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    id="passwordAdmin"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button
                                className="btn-admin pink"
                                onClick={this.handleLogin}
                                disabled={!this.state.emailAdmin || !this.state.passwordAdmin}
                                >
                                LOG IN
                            </Button>
                        </ContentForm>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapState = state => ({
	token: state.admin.token,
	error: state.admin.error,
})

const mapDispatch = dispatch => ({
    login: value =>
      dispatch({ type: 'admin/login', payload : value}),
});


export default connect(mapState, mapDispatch)(Login)
