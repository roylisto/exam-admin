import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// COMPONENTS
import Button from '../../components/Button';
import TabelPeserta from "../../components/Tabel/Tabel";
import Modal from "../../components/Modal/ModalInputPeserta";
import Loading from "../../components/Loading";
import { emailFormatter, phoneNumberFormatter } from "../../modules/Formatter";
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
            columns: [
                { dataField: 'email', text: 'Email' },
                { dataField: 'nama', text: 'Nama' },
                { dataField: 'password', text: 'Password' },
                { dataField: 'no_hp', text: 'No HP' },
                { dataField: 'jenis_kelamin', text: 'Jenis Kelamin' },
                { dataField: 'tanggal_lahir', text: 'Tanggal Lahir' },
                { dataField: 'kelompok', text: 'Kelompok' },
                { dataField: 'instansi', text: 'Instansi' },
            ],
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
            },
            errors: {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCek = this.handleCek.bind(this);
        this.handleExport = this.handleExport.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchJadwalTest();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data && this.props.data[0] !== null) {
            this.setState({
                data: this.props.data,
            });
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
            });
        }
        // saat ada update data peserta by email
        if (prevProps.dataPeserta !== this.props.dataPeserta && this.props.dataPeserta !== null) {
            
            let dataPeserta =  this.props.dataPeserta
            let tanggal_lahir = new Date(dataPeserta.tanggal_lahir);
            let jenis_kelamin = (dataPeserta.jenis_kelamin) ? dataPeserta.jenis_kelamin.toLowerCase() : "pria"
            
            this.setState(prevState => ({
                disabled : false,
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
            showModal : !this.state.showModal,
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

    handleChangeDate(date) {
        this.setState(prevState => ({
            dataInput : { 
                ...prevState.dataInput,
                tanggal_lahir : date
            },
            errors : {},
            errorMsg : ""
        }))
    }

    async handleCek(e) {
        e.preventDefault();
        let { dataInput } = this.state;

        if(dataInput.email === ""){
            this.setState({ 
                errors: { email : true },
                errorMsg : "Data tidak boleh kosong."
            });
        }
        else if(!emailFormatter(dataInput.email)){
            this.setState({
                errors: { email : "Format email salah !"}
            })
        }
        else {
            await this.props.getPesertaByEmail(dataInput.email)
            this.setState({
                disabled : false
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
            const payload = dataInput;
            this.props.addPeserta(payload);
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
                <Modal 
                    handleClickModal={this.handleClickModal}
                    showModal={this.state.showModal}
                    handleChange={this.handleChange}
                    dataInput={this.state.dataInput}
                    errors={this.state.errors}
                    handleCek={this.handleCek}
                    disabled={this.state.disabled}
                    handleSubmit={this.handleSubmit}
                    handleChangeDate={this.handleChangeDate}
                    errorMsg={this.state.errorMsg}
                />
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
});


export default connect(mapState, mapDispatch)(Peserta)
