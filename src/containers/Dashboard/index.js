import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
// COMPONENTS
import NavbarDashboard from '../../components/NavbarDashboard';
import Sidebar from '../../components/Sidebar';
import JadwalTest from "./JadwalTest";
import SidebarIcon from "../../assets/images/sidebarmenu.svg";
import Peserta from './Peserta';

const ButtonSidebar = styled.button`{
    transform: rotate(90deg) scaleY(-1);
    position : fixed;
    top: 15px;
    left : ${props => props.minimize ? "10px" : "165px"};
    z-index: 20;
    background: transparent;
    border: none;
    transition: all 0.5s;
    &:active,
    &:focus {
        outline: none !important;
    }
    &:hover {
        top: 16px;
    }
}`

const Container = styled.div`{
    font-family: 'Poppins';
    padding-top: 50px;
    padding-right: ${props => props.minimize ? "34px" : "0"};
    padding-left: ${props => props.minimize ? "34px" : "200px"};
    padding-bottom: 50px;
    transition: all 0.5s;
}`;

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
             minimize : false
        }
        this.handleMinimize = this.handleMinimize.bind(this);
    }
    
    handleMinimize() {
        this.setState({
            minimize : !this.state.minimize
        });
    }
    render() {
        return (
            <React.Fragment>
                <ButtonSidebar
                    minimize={this.state.minimize}
                    onClick={this.handleMinimize}>
                    <img src={SidebarIcon} />
                </ButtonSidebar>
                <Sidebar 
                    minimize={this.state.minimize}
                />
                <NavbarDashboard />

                <Container 
                    minimize={this.state.minimize}>
                    <Switch>
                        <Route exact path="/dashboard" component={JadwalTest}  />
                        <Route path="/dashboard/jadwaltest" component={JadwalTest}  />
                        <Route path="/dashboard/peserta" component={Peserta}  />
                    </Switch>
                </Container>

            </React.Fragment>
        )
    }
}

export default Dashboard
