import React, { Component } from 'react';
import styled from 'styled-components';
// COMPONENTS
import NavbarDashboard from '../../components/NavbarDashboard';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';
import TabelPeserta from "../../components/Tabel/TabelJadwal";

const Container = styled.div`{
    font-family: 'Poppins';
    padding : 50px 0 50px ${props => props.span ? "50px" : "200px"};
}`;

const Header = styled.div`{
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding : 30px 10px 15px;
}`;

class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            show : "jadwalTest"
        }
        this.handleSwitchView = this.handleSwitchView.bind(this);
        this.switchView = this.switchView.bind(this);
    }

    handleSwitchView(view) {
        this.setState({
            show : view
        })
    }
    
    switchView(){
        switch(this.state.show) {
            case "jadwalTest" : 
                return (
                    <Container>
                        <Header>
                            <h4>Jadwal Test</h4>
                            <Button>
                                Add Jadwal Test
                            </Button>
                        </Header>
                        <TabelPeserta />
                    </Container>
                );
            case "peserta" : 
                return (
                    <Container>
                        <h4>Peserta</h4>
                    </Container>
                );
            default:  
                return null; 
        }
    }

    render() {
        return (
            <React.Fragment>
                <Sidebar 
                    handleSwitchView={this.handleSwitchView}
                    show={this.state.show}
                />
                <NavbarDashboard />
                
                {this.switchView()}

            </React.Fragment>
        )
    }
}

export default Dashboard
