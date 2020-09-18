import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// COMPONENTS
import Button from '../../components/Button';
import TabelPeserta from "../../components/Tabel/Tabel";
import ModalHapus from '../../components/Modal/ModalHapus';
import Modal from "../../components/Modal/ModalInputPeserta";
import Loading from "../../components/Loading";
import { emailFormatter, phoneNumberFormatter, dateFormatter, numberFormatter } from "../../modules/Formatter";
// ASSETS 
import download from "../../assets/images/save.svg"
import plus from "../../assets/images/plus.svg"

const Header = styled.div`{
    display : flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding : 10px;
    .form-control {
        font-family: 'Poppins';
        font-size: 16px;
        padding: 5px 10px;
        width: 250px;
        border-radius: 0;
    }
    button {
        font-size: 15px;
    }
}`;

class Peserta extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            data: null,
            columns: null,
            namaInstansi : '',
            loading: true,
            jadwalTest : null,
            filter : '',
            filterID : '',
            disabled: true,
            dataInput: {
                nama : '',
                email : '',
                no_hp : '',
                jenis_kelamin : '',
                tanggal_lahir : '',
                kelompok : '',
                instansi : '',
                password : '',
                valid: '',
                expired: ''
            },
            errors: {},
            isLoadind: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCek = this.handleCek.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleOnFocusEmail = this.handleOnFocusEmail.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.handleClickButtonAction = this.handleClickButtonAction.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleHapus = this.handleHapus.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    
    componentDidMount() {
        const columns = [
            { dataField: 'id', text: 'ID',
                formatter: (data) => numberFormatter(data, this.props.data) },
            { dataField: 'email', text: 'Email' },
            { dataField: 'nama', text: 'Nama' },
            { dataField: 'password', text: 'Password' },
            { dataField: 'no_hp', text: 'No HP' },
            { dataField: 'jenis_kelamin', text: 'Jenis Kelamin' },
            { dataField: 'tanggal_lahir', text: 'Tanggal Lahir' },
            { dataField: 'kelompok', text: 'Kelompok' },
            { dataField: 'instansi', text: 'Instansi' },
            { dataField: 'valid', text: 'Valid',
                formatter: dateFormatter },
            { dataField: 'expired', text: 'Expired',
                formatter: dateFormatter },
            { dataField: '', text: ''},
            { dataField: 'aksi', text: 'Action',
                formatter: this.actionFormatter },
        ]
        this.setState({ columns })
        this.props.fetchJadwalTest();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data && this.props.data[0] !== null) {
            this.setState({
                data: this.props.data,
                showModal: false
            });
            this.resetData();
        }
        if (prevProps.jadwalTest !== this.props.jadwalTest && this.props.jadwalTest[0] !== null) {
            this.setState({
                jadwalTest: this.props.jadwalTest,
                loading: false
            });
        }
        if (prevProps.errorMsg !== this.props.errorMsg && this.props.errorMsg !== "") {
            this.setState({
                errorMsg: this.props.errorMsg,
                isLoading: false
            });
        }
        // saat ada update data peserta by email
        if (prevProps.dataPeserta !== this.props.dataPeserta && this.props.dataPeserta !== null) {
            
            let dataPeserta =  this.props.dataPeserta
            let tanggal_lahir = new Date(dataPeserta.tanggal_lahir);
            let jenis_kelamin = (dataPeserta.jenis_kelamin) ? dataPeserta.jenis_kelamin.toLowerCase() : "pria"
            
            this.setState(prevState => ({
                disabled : false,
                isLoading : false,
                dataInput: {
                    ...prevState.dataInput,
                    nama : dataPeserta.nama,
                    no_hp : dataPeserta.no_hp,
                    jenis_kelamin,
                    tanggal_lahir,
                    kelompok : dataPeserta.kelompok,
                    instansi : dataPeserta.instansi,
                }
            }));
        }
    }

    handleClickModal() {
        this.setState({
            showModal : "addPeserta"
        })
        this.resetData();
    }
    // close modal
    handleCloseModal() {
        this.setState({
            showModal : false,
        })
        this.resetData();
    }

    resetData() {
        this.setState({
            disabled: true,
            errors: {},
            errorMsg : "",
            dataInput: {
                nama : '',
                email : '',
                no_hp : '',
                jenis_kelamin : '',
                tanggal_lahir : '',
                kelompok : '',
                instansi : '',
                valid: '',
                expired: ''
            },
            isLoading : false
        })
    }
    
    handleChangeFilter({target}) {
        let string = target.value;
        let split = string.split(";");
        
        if(string === ""){
            this.setState({
                filterID : "",
                filter: ""
            })
        }
        else {
            this.props.fetchPesertaList(split[0]);
            this.setState({
                filterID : split[0],
                filter: split[1],
                data: null
            })
        }
        
    }
    
    handleChange({target}) {
        this.setState(prevState => ({
            dataInput : { 
                ...prevState.dataInput,
                [target.id] : target.value
            },
            errors : {},
            errorMsg : ""
        }))
    }

    handleChangeDate(date, time) {
        this.setState(prevState => ({
            dataInput : { 
                ...prevState.dataInput,
                [time] : date
            },
            errors : {},
            errorMsg : ""
        }))
    }

    async handleCek(e) {
        e.preventDefault();
        let { dataInput } = this.state;

        this.setState({isLoading: true})
        if(dataInput.email === ""){
            this.setState({ 
                errors: { email : true },
                errorMsg : "Data tidak boleh kosong.",
                isLoading: false
            });
        }
        else if(!emailFormatter(dataInput.email)){
            this.setState({
                errors: { email : "Format email salah !"},
                isLoading: false
            })
        }
        else {
            await this.props.getPesertaByEmail(dataInput.email)
            this.setState({
                disabled : false,
                isLoading : false
            })
        }
    }
    
    formValidate() {
        let { dataInput } = this.state;
        let propertyNames = Object.keys(dataInput);
        let propertyValues = Object.values(dataInput);
        let error = {};
        let valid = true;
        
        for(let i = 0; i<propertyNames.length; i++){
            if(propertyValues[i] === ""){
                valid = false;
                error[propertyNames[i]] = true;
            }
        }

        if(!phoneNumberFormatter(dataInput.no_hp)){
            valid = false;
            error["no_hp"] = "Format input salah !";
        }

        if(!emailFormatter(dataInput.email)){
            valid = false;
            error["email"] = "Format email salah !";
        }

        this.setState({ 
            errors: error,
            errorMsg : (valid) ? "" : "Data tidak boleh kosong."
        });
        return valid
    }

    handleSubmit(e) {
        e.preventDefault();
        let { dataInput, filterID } = this.state
        
        Object.assign(dataInput, {jadwal_test : filterID})

        if(this.formValidate()) {
            this.setState({isLoading:true});
            const payload = dataInput;
            this.props.addPeserta(payload);
        }
    }

    handleHapus() {
        let id = this.state.dataInput.id;
        let payload = {
            id_peserta : id,
            id_jadwaltest : this.state.filterID
        }
        this.setState({isLoading:true})
        this.props.hapusPeserta(payload);
    }

    handleEdit(e) {
        e.preventDefault();
        let { dataInput, filterID } = this.state
        if(this.formValidate()) {
            const payload = {
                data: {
                    payload: dataInput,
                    id: dataInput.id
                },
                id_jadwaltest : filterID
            }
            
            this.setState({isLoading : true});
            this.props.editPeserta(payload);
        }
    }

    handleExport(route) {
        let { filterID } = this.state;
        let payload = {
            route : route,
            params : filterID
        }
        this.props.exportPeserta(payload);
    }

    handleOnFocusEmail() {
        this.setState({
            disabled: true,
            errors: {},
            errorMsg : "",
            dataInput: {
                nama : '',
                email : '',
                no_hp : '',
                jenis_kelamin : '',
                tanggal_lahir : '',
                kelompok : '',
                instansi : '',
            }
        })
        this.props.SET_ERROR_STATUS({errorMsg : ""})
    }

    handleClickButtonAction(modal, row) {
        let tanggal_lahir = new Date(row.tanggal_lahir);
        let valid = new Date(row.valid);
        let expired = new Date(row.expired);

        this.setState({
            showModal : modal,
            disabled : false,
            dataInput: {
                id: row.id,
                nama : row.nama,
                email : row.email,
                no_hp : row.no_hp,
                jenis_kelamin : row.jenis_kelamin,
                tanggal_lahir,
                kelompok : row.kelompok,
                instansi : row.instansi,
                valid,
                expired,
            },
            errors: {},
        });
        
    }

    actionFormatter(e, row) {
        return (
            <div className="btn-group">
                <Button white small xs onClick={()=>this.handleClickButtonAction("editPeserta",row)}>
                    <img src={require("../../assets/images/edit.svg")} />
                    Edit
                </Button>
                <Button white small xs onClick={()=>this.handleClickButtonAction("hapusPeserta",row)}>
                    <img src={require("../../assets/images/delete.svg")} />
                    Hapus
                </Button>
            </div>
        )
    }

    switchModal() {
        switch(this.state.showModal) {
            case "addPeserta" : 
                return (
                    <Modal 
                        handleClickModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        dataInput={this.state.dataInput}
                        errors={this.state.errors}
                        handleCek={this.handleCek}
                        disabled={this.state.disabled}
                        handleSubmit={this.handleSubmit}
                        handleChangeDate={this.handleChangeDate}
                        errorMsg={this.state.errorMsg}
                        onFocus={this.handleOnFocusEmail}
                        isLoading={this.state.isLoading}
                    />
                );
                break;
            case "editPeserta" : 
                return (
                    <Modal 
                        handleClickModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        dataInput={this.state.dataInput}
                        errors={this.state.errors}
                        disabled={this.state.disabled}
                        handleSubmit={this.handleEdit}
                        handleChangeDate={this.handleChangeDate}
                        errorMsg={this.state.errorMsg}
                        isLoading={this.state.isLoading}
                    />
                );
                break;
            case "hapusPeserta" : 
                return (
                    <ModalHapus
                        type="jadwal"
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleHapus={this.handleHapus}
                        isLoading={this.state.isLoading}
                    />
                );
                break;
            default:
                return null
        }
    }

    render() {
        if(this.state.loading) {
            return <Loading />
        }
        return (
            <React.Fragment>
                <Header>
                    <form>
                        <select 
                            className="form-control" 
                            id="filter"
                            onChange={this.handleChangeFilter}>
                            <option value="">Jadwal Test</option>
                            {
                                this.state.jadwalTest.map((val,i)=>{
                                    return <option key={i} value={val.id+";"+val.instansi}>{val.instansi}</option>
                                })
                            }
                        </select>
                    </form>
                    <div>
                        <Button white 
                            onClick={()=>this.handleExport("jawaban-test/")} 
                            disabled={this.state.filterID === ""}>
                            <img src={download} />
                            Export Jawaban
                        </Button>
                        <Button white 
                            onClick={()=>this.handleExport("peserta-test/")} 
                            disabled={this.state.filterID === ""}>
                            <img src={download} />
                            Export Peserta
                        </Button>
                        <Button 
                            style={{width:"150px"}}
                            onClick={this.handleClickModal} 
                            disabled={this.state.filter === ""}>
                            <img src={plus} />
                            Input Peserta
                        </Button>
                    </div>
                </Header>
                <div className="d-flex pl-2">
                    <h5><b>Jadwal Test : </b></h5>
                    <span>&emsp;{this.state.filter}</span>
                </div>
                {
                    (this.state.filter !== "") ? 
                    <TabelPeserta
                        keyField="id"
                        data={this.state.data}
                        columns={this.state.columns}
                        tableName="tabel-peserta"
                    />
                    : ""
                }
                {this.switchModal()}
            </React.Fragment>
        )
    }
}


const mapState = state => ({
    data: state.peserta.data,
    jadwalTest: state.jadwalTest.data,
    errorMsg: state.peserta.errorMsg,
    dataPeserta: state.peserta.dataPeserta
})

const mapDispatch = dispatch => ({
    fetchJadwalTest: () =>
        dispatch({ type: 'jadwalTest/fetchJadwalTest' }),
    fetchPesertaList: value =>
        dispatch({ type: 'peserta/fetchPesertaList', payload: value }),
    addPeserta: value =>
        dispatch({ type: 'peserta/addPeserta', payload: value }),
    exportPeserta: value =>
        dispatch({ type: 'peserta/exportPeserta', payload: value }),
    getPesertaByEmail: value =>
        dispatch({ type: 'peserta/getPesertaByEmail', payload: value }),
    SET_ERROR_STATUS: value =>
        dispatch({ type: 'peserta/SET_ERROR_STATUS', payload: value }),
    editPeserta: value =>
        dispatch({ type: 'peserta/editPeserta', payload: value }),
    hapusPeserta: value =>
        dispatch({ type: 'peserta/hapusPeserta', payload: value })
});


export default connect(mapState, mapDispatch)(Peserta)
