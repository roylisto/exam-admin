import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// COMPONENTS
import Button from '../../components/Button';
import TabelPeserta from "../../components/Tabel/Tabel";
import Modal from "../../components/Modal/ModalInputPeserta";
import Loading from "../../components/Loading";
import { emailFormatter, phoneNumberFormatter } from "../../js/Formatter";

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
        width: 150px;
    }
}`;

class Peserta extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            data: null,
            columns: [],
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
    }
    
    componentDidMount() {
        this.props.fetchJadwalTest();
    }

    componentDidUpdate(prevProps) {
        const columns  = [
            { dataField: 'email', text: 'Email' },
            { dataField: 'nama', text: 'Nama' },
            { dataField: 'no_hp', text: 'No HP' },
            { dataField: 'jenis_kelamin', text: 'Jenis Kelamin' },
            { dataField: 'tanggal_lahir', text: 'Tanggal Lahir' },
            { dataField: 'kelompok', text: 'Kelompok' },
            { dataField: 'instansi', text: 'Instansi' },
        ]
        if (prevProps.data !== this.props.data && this.props.data[0] !== null) {
            this.setState({
                data: this.props.data,
                columns : columns,
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
        if(split[0] !== ""){
            this.props.fetchPesertaList(split[0]);
            this.setState({
                filterID : split[0],
                filter: split[1]
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

    handleCek(e) {
        e.preventDefault();
        let { data, dataInput } = this.state;

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
            let dataPeserta =  data.filter(function(val) {
                return val.email === dataInput.email;
            });
            
            if(dataPeserta[0] !== undefined){
                let tanggal_lahir = new Date(dataPeserta[0].tanggal_lahir);
                
                this.setState(prevState => ({
                    disabled : false,
                    dataInput: {
                        ...prevState.dataInput,
                        nama : dataPeserta[0].nama,
                        no_hp : dataPeserta[0].no_hp,
                        jenis_kelamin : (dataPeserta[0].jenis_kelamin) ? dataPeserta[0].jenis_kelamin : "pria",
                        tanggal_lahir,
                        kelompok : dataPeserta[0].kelompok,
                        instansi : dataPeserta[0].instansi,
                    }
                }));
            }
            else {
                this.setState({
                    disabled: false,
                    dataInput: {
                        nama : '',
                        no_hp : '',
                        jenis_kelamin : '',
                        tanggal_lahir : '',
                        kelompok : '',
                        instansi : '',
                    }
                });
            }
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
                        <Button white>
                            <img src={require("../../assets/images/save.svg")} />
                            Import list
                        </Button>
                        <Button onClick={this.handleClickModal} disabled={this.state.filter === ""}>
                            <img src={require("../../assets/images/plus.svg")} />
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
                        keyField="email"
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
})

const mapDispatch = dispatch => ({
    fetchJadwalTest: () =>
        dispatch({ type: 'jadwalTest/fetchJadwalTest' }),
    fetchPesertaList: value =>
        dispatch({ type: 'peserta/fetchPesertaList', payload: value }),
    addPeserta: value =>
        dispatch({ type: 'peserta/addPeserta', payload: value }),
});


export default connect(mapState, mapDispatch)(Peserta)
