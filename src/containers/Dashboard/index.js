import React, { Component } from 'react';
import styled from 'styled-components';
// COMPONENTS
import NavbarDashboard from '../../components/NavbarDashboard';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';
import TabelPeserta from "../../components/Tabel/TabelPeserta";
import TabelJadwal from "../../components/Tabel/TabelJadwal";
import Modal from "../../components/Modal/ModalTambahJadwal";
import Container from "../../components/Container";

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
            show : "jadwalTest",
            showModal : false,
            timeStart : new Date(),
            timeEnd : new Date()
        }
        this.handleSwitchView = this.handleSwitchView.bind(this);
        this.switchView = this.switchView.bind(this);
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        window.location.reload()
    }

    handleChangeDate(date, time){
        this.setState({
            [time]: date,
        })
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value,
            showError: false
        })
    }

    handleClickModal() {
        this.setState({
            showModal : !this.state.showModal
        })
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
                            <Button onClick={this.handleClickModal}>
                                Add Jadwal Test
                            </Button>
                        </Header>
                        <TabelJadwal />
                    </Container>
                );
            case "peserta" : 
                return (
                    <Container>
                        <Header>
                            <h4>Peserta</h4>
                            <div>
                                <Button white>
                                    Import list
                                </Button>
                                <Button>
                                    Input Peserta
                                </Button>
                            </div>
                        </Header>
                        <TabelPeserta />
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
                
                <Modal 
                    handleClickModal={this.handleClickModal}
                    showModal={this.state.showModal} 
                    handleChange={this.handleChange}
                    timeStart={this.state.timeStart}
                    timeEnd={this.state.timeEnd}
                    handleChangeDate={this.handleChangeDate}
                    handleSubmit={this.handleSubmit}
                />
                
                {this.switchView()}

            </React.Fragment>
        )
    }
}

export default Dashboard
