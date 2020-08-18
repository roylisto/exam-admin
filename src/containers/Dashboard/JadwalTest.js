import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// COMPONENTS
import TabelJadwal from "../../components/Tabel/Tabel";
import Button from '../../components/Button';
import Modal from "../../components/Modal/ModalTambahJadwal";
import { dateFormatter, numberFormatter } from "../../js/Formatter";

const Header = styled.div`{
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding : 30px 10px 15px;
    h4 {
        font-weight: bold;
    }
}`;

class JadwalTest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data : [],
            columns : [
                { dataField: 'id', text: 'ID',
                    formatter : (data)=>numberFormatter(data,this.props.data)},
                { dataField: 'instansi', text: 'Instansi'}, 
                { dataField: 'waktu', text: 'Waktu Mulai',
                    formatter : dateFormatter},  
                { dataField: 'expired', text: 'Waktu Berakhir',
                    formatter : dateFormatter},  
                { dataField: 'keterangan', text: 'Keterangan'}, 
            ],
            showModal : false,
            timeStart : '',
            timeEnd : '',
            instansi : '',
            keterangan : ''
        }
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.fetchJadwalTest(this.props.token);
        document.getElementById("timeStart").setAttribute("autocomplete", "off");
        document.getElementById("timeEnd").setAttribute("autocomplete", "off");
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data && this.props.data[0] !== null){
            this.setState({
                data : this.props.data,
            })
        }
    }
    
    handleClickModal() {
        this.setState({
            showModal : !this.state.showModal
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let { timeStart, timeEnd, instansi, keterangan } = this.state

        if(instansi !== "" && timeStart !== ""){
            const payload = {
                waktu : dateFormatter(timeStart),
                expired : dateFormatter(timeEnd),
                instansi : instansi,
                keterangan : keterangan
            }
            this.props.addJadwalTest(payload)
            window.location.reload()
        }

        this.handleClickModal()
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

    render() {
        return (
            <React.Fragment>
                <Header>
                    <h4>Jadwal Test</h4>
                    <Button onClick={this.handleClickModal}>
                        Add Jadwal Test
                    </Button>
                </Header>
                <TabelJadwal 
                    data={this.state.data}
                    columns={this.state.columns}
                    tableName="tabel-jadwal"
                />
                <Modal 
                    handleClickModal={this.handleClickModal}
                    showModal={this.state.showModal} 
                    handleChange={this.handleChange}
                    timeStart={this.state.timeStart}
                    timeEnd={this.state.timeEnd}
                    instansi={this.state.instansi}
                    keterangan={this.state.keterangan}
                    handleChangeDate={this.handleChangeDate}
                    handleSubmit={this.handleSubmit}
                />
            </React.Fragment>
        )
    }
}

const mapState = state => ({
	token: state.admin.token,
	data: state.jadwalTest.data,
})

const mapDispatch = dispatch => ({
    fetchJadwalTest: value =>
        dispatch({ type: 'jadwalTest/fetchJadwalTest', payload : value}),
    addJadwalTest: value =>
        dispatch({ type: 'jadwalTest/addJadwalTest', payload : value}),
});


export default connect(mapState, mapDispatch)(JadwalTest)
