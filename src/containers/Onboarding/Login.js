import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    color: #ff8080;
    background-image: url("https://cdn.zeplin.io/5f281c5cde10f72079056c76/assets/ebf99d37-084c-42fd-a465-273925f310b0.png");
    background-repeat: no-repeat;
    background-size : auto 100%;
    img {
        width: 100%;
    }
    .row {
        max-width: 100%;
        max-height: 100vh;
        overflow: hidden;
    }
`;

const ContentForm = styled.form`
    margin-right : 20vw;
    padding : 20px;
    background-color : white;
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
                <div className='d-flex align-items-center justify-content-end h-100'>
                    <ContentForm onSubmit={this.handleLogin}>
                        <p>Welcome to Admin Page</p>
                        <h3>Login To your Account</h3>
                        {
                            (this.props.error) ?
                                <div className="alert" role="alert">
                                    Login Gagal !
                                </div>
                                : ""
                        }
                        <div className="form-group">
                            <input
                                className="form-control"
                                id="emailAdmin"
                                type="email"
                                placeholder="Email"
                                onChange={this.handleChange} 
                                required/>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                id="passwordAdmin"
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-admin pink"
                            onClick={this.handleLogin}
                            disabled={!this.state.emailAdmin || !this.state.passwordAdmin}
                            >
                            LOG IN
                        </button>
                    </ContentForm>
                </div>
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