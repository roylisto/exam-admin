import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// COMPONENTS
import Button from '../../components/Button';
import TabelPeserta from "../../components/Tabel/Tabel";
import Modal from "../../components/Modal/ModalInputPeserta";
import Loading from "../../components/Loading";
import { dateFormatter } from "../../js/Formatter";

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
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCek = this.handleCek.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchJadwalTest();
        this.props.fetchPesertaList();
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
    }

    handleClickModal() {
        this.setState({
            showModal : !this.state.showModal,
            disabled: true,
            errors: {},
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
    
    handleChange({target}) {
        if(target.id === "filter") {
            this.setState({
                [target.id]: target.value,
            })
        } else {
            this.setState(prevState => ({
                dataInput : { 
                    ...prevState.dataInput,
                    [target.id] : target.value
                },
                errors : {}
            }))
        }
    }

    handleChangeDate(date) {
        this.setState(prevState => ({
            dataInput : { 
                ...prevState.dataInput,
                tanggal_lahir : date
            },
            errors : {}
        }))
    }

    handleCek(e) {
        e.preventDefault();
        let { data, dataInput } = this.state;

        if(dataInput.email === ""){
            this.setState({ 
                errors: { email : true }
            });
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
                this.setState({disabled: false});
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
                error[propertyNames[i]] = true
            }
        }

        this.setState({ errors: error });
        return valid
    }

    handleSubmit(e) {
        e.preventDefault();
        let { dataInput } = this.state
        
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
                            onChange={this.handleChange}>
                            <option>Jadwal Test</option>
                            {
                                this.state.jadwalTest.map((val,i)=>{
                                    return <option key={i} value={val.instansi}>{val.instansi}</option>
                                })
                            }
                        </select>
                    </form>
                    <div>
                        <Button white>
                            <img src={require("../../assets/images/save.svg")} />
                            Import list
                        </Button>
                        <Button onClick={this.handleClickModal}>
                            <img src={require("../../assets/images/plus.svg")} />
                            Input Peserta
                        </Button>
                    </div>
                </Header>
                <div className="d-flex pl-2">
                    <h5><b>Jadwal Test : </b></h5>
                    <span>&emsp;{this.state.filter}</span>
                </div>
                <TabelPeserta
                    keyField="email"
                    data={this.state.data}
                    columns={this.state.columns}
                    tableName="tabel-peserta"
                />
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
                />
            </React.Fragment>
        )
    }
}


const mapState = state => ({
    data: state.peserta.data,
    jadwalTest: state.jadwalTest.data,
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
