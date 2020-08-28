import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// COMPONENTS
import TabelJadwal from "../../components/Tabel/Tabel";
import Button from '../../components/Button';
import Modal from "../../components/Modal/ModalTambahJadwal";
import ModalHapus from '../../components/Modal/ModalHapus';
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
            data: null,
            columns: [],
            showModal: '',
            timeStart: '',
            timeEnd: '',
            instansi: '',
            keterangan: '',
            errors: {},
        }
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickButtonAction = this.handleClickButtonAction.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.handleHapus = this.handleHapus.bind(this);
    }

    componentDidMount() {
        this.props.fetchJadwalTest();
    }

    componentDidUpdate(prevProps) {
        const columns = [
            { dataField: 'id', text: 'ID',
                formatter: (data) => numberFormatter(data, this.props.data) },
            { dataField: 'instansi', text: 'Instansi' },
            { dataField: 'waktu', text: 'Waktu Mulai',
                formatter: dateFormatter },
            { dataField: 'expired', text: 'Waktu Berakhir',
                formatter: dateFormatter },
            { dataField: 'keterangan', text: 'Keterangan' },
            { dataField: '', text: 'Action',
                formatter: this.actionFormatter },
        ]
        if (prevProps.data !== this.props.data && this.props.data[0] !== null) {
            this.setState({
                data: this.props.data,
                columns: columns
            });
        }
    }

    handleHapus() {
        let { id } = this.state;

        this.props.hapusJadwalTest(id);
    }

    handleClickModal(modal) {
        this.setState({
            showModal: modal,
            errors: {},
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            timeStart: '',
            timeEnd: '',
            instansi: '',
            keterangan: '',
            errors: {},
        })
    }

    handleClickButtonAction(modal, row) {
        let waktu = new Date(row.waktu);
        let expired = new Date(row.expired);

        this.setState({
            showModal : modal,
            timeStart: waktu,
            timeEnd: expired,
            instansi: row.instansi,
            keterangan: row.keterangan,
            id: row.id,
            errors: {},
        });
    }

    handleEditSubmit(e) {
        e.preventDefault();
        let { timeStart, timeEnd, instansi, keterangan, id } = this.state
        if(this.formValidate()) {
            const data = {
                payload: {
                    instansi: instansi,
                    waktu: dateFormatter(timeStart),
                    expired: dateFormatter(timeEnd),
                    keterangan: (keterangan) ? keterangan : "-",
                },
                id: id
            }
            this.props.editJadwalTest(data);
        }
    }

    actionFormatter(e, row) {
        return (
            <div className="btn-group">
                <Button white small xs onClick={()=>this.handleClickButtonAction("editJadwal",row)}>
                    <img src={require("../../assets/images/edit.svg")} />
                    Edit
                </Button>
                <Button white small xs onClick={()=>this.handleClickButtonAction("hapusJadwal",row)}>
                    <img src={require("../../assets/images/delete.svg")} />
                    Hapus
                </Button>
            </div>
        )
    }

    formValidate() {
        let { timeStart, timeEnd, instansi } = this.state;
        let error = {};
        let valid = true;
        
        if (timeStart === "") {
            valid = false;
            error["timeStart"] = true;
        }
        if (timeEnd === "") {
            valid = false;
            error["timeEnd"] = true;
        }
        if (instansi === "") {
            valid = false;
            error["instansi"] = true;
        }
        if(timeEnd - timeStart <= 0) {
            valid = false;
            error["timeEndError"] = true;
        }

        this.setState({ errors: error });
        return valid
    }

    handleSubmit(e) {
        e.preventDefault();
        let { timeStart, timeEnd, instansi, keterangan } = this.state

        if (this.formValidate()) {
            const payload = {
                waktu: dateFormatter(timeStart),
                expired: dateFormatter(timeEnd),
                instansi: instansi,
                keterangan: (keterangan) ? keterangan : "-"
            };
            this.props.addJadwalTest(payload);
        }
    }

    handleChangeDate(date, time) {
        this.setState({
            [time]: date,
            errors: { [time]: false }
        })
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value,
            errors: { [e.target.id]: false }
        })
    }

    switchModal() {
        switch(this.state.showModal) {
            case "addJadwal" : 
                return (
                    <Modal
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        timeStart={this.state.timeStart}
                        timeEnd={this.state.timeEnd}
                        instansi={this.state.instansi}
                        keterangan={this.state.keterangan}
                        handleChangeDate={this.handleChangeDate}
                        handleSubmit={this.handleSubmit}
                        errors={this.state.errors}
                        title="Add"
                    />
                );
                break;
            case "editJadwal" : 
                return (
                    <Modal
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        timeStart={this.state.timeStart}
                        timeEnd={this.state.timeEnd}
                        instansi={this.state.instansi}
                        keterangan={this.state.keterangan}
                        handleChangeDate={this.handleChangeDate}
                        handleSubmit={this.handleEditSubmit}
                        errors={this.state.errors}
                        title="Edit"
                    />
                );
                break;
            case "hapusJadwal" : 
                return (
                    <ModalHapus
                        type="jadwal"
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleHapus={this.handleHapus}
                    />
                );
                break;
            default:
                return null
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header>
                    <h4>Jadwal Test</h4>
                    <Button onClick={()=>this.handleClickModal("addJadwal")}>
                        Add Jadwal Test
                    </Button>
                </Header>
                <TabelJadwal
                    keyField='id'
                    data={this.state.data}
                    columns={this.state.columns}
                    tableName="tabel-jadwal"
                />
                {this.switchModal()}
            </React.Fragment>
        )
    }
}

const mapState = state => ({
    token: state.admin.token,
    data: state.jadwalTest.data,
})

const mapDispatch = dispatch => ({
    fetchJadwalTest: () =>
        dispatch({ type: 'jadwalTest/fetchJadwalTest' }),
    addJadwalTest: value =>
        dispatch({ type: 'jadwalTest/addJadwalTest', payload: value }),
    editJadwalTest: (value) =>
        dispatch({ type: 'jadwalTest/editJadwalTest', payload: value }),
    hapusJadwalTest: (value) =>
        dispatch({ type: 'jadwalTest/hapusJadwalTest', payload: value }),
});


export default connect(mapState, mapDispatch)(JadwalTest)
