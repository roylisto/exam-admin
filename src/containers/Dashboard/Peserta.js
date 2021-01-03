import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// COMPONENTS
import Button from '../../components/Button';
import ButtonIcon from '../../components/ButtonIcon';
import TabelPeserta from "../../components/Tabel/Tabel";
import ModalHapus from '../../components/Modal/ModalHapus';
import ModalPeserta from "../../components/Modal/ModalInputPeserta";
import ModalResetJawaban from "../../components/Modal/ModalResetJawaban";
import ModalErrorUpload from "../../components/Modal/ModalErrorUpload";
import ModalWaitDownload from "../../components/Modal/ModalWaitDownload";
import Loading from "../../components/Loading";
import { emailFormatter, phoneNumberFormatter, dateFormatter, formatArray }
  from "../../modules/Formatter";
// ASSETS
import download from "../../assets/images/save.svg";
import plus from "../../assets/images/plus.svg";
import upload from "../../assets/images/upload.svg";
import { textFilter } from 'react-bootstrap-table2-filter';

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
            namaInstansi : this.props.match.params.instansi,
            loading: true,
            loadingData: false,
            jadwalTest : null,
            filter : this.props.match.params.instansi,
            filterID : this.props.match.params.idJadwal,
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
                expired: '',
                jenis_test: [],
            },
            errors: {},
            errorUpload: [],
            isLoadind: false,
            uploadIST: false,
            uploadMII: false,
            loadingDownload: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeJenisTest = this.handleChangeJenisTest.bind(this);
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
        this.props.fetchPesertaList(this.props.match.params.idJadwal);
    }

    componentDidMount() {
        const columns = [
            { dataField: 'id', text: 'ID' },
            { dataField: 'email', text: 'Email' , filter: textFilter()},
            { dataField: 'nama', text: 'Nama' , filter: textFilter()},
            { dataField: 'password', text: 'Password' },
            { dataField: 'no_hp', text: 'No HP' , filter: textFilter()},
            { dataField: 'jenis_kelamin', text: 'Jenis Kelamin' },
            { dataField: 'tanggal_lahir', text: 'Tanggal Lahir' },
            { dataField: 'kelompok', text: 'Kelompok' , filter: textFilter()},
            { dataField: 'instansi', text: 'Instansi' , filter: textFilter()},
            { dataField: 'jenis_test', text: 'Jenis Test',
              formatter: formatArray , filter: textFilter()},
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
                    jenis_test : dataPeserta.jenis_test,
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
                expired: '',
                jenis_test: [],
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

    handleChangeJenisTest({target}) {
      const jenisTest = this.state.dataInput.jenis_test ? [...this.state.dataInput.jenis_test] : [];
      if (target.checked) {
        jenisTest.push(target.name);
      } else {
        const index = jenisTest.indexOf(target.name);
        jenisTest.splice(index, 1);
      }
      this.setState(prevState => ({
        dataInput : {
            ...prevState.dataInput,
            jenis_test : jenisTest,
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
        let empty = false;

        for(let i = 0; i<propertyNames.length; i++){
            if(propertyValues[i] === ""){
                valid = false;
                empty = true;
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

        if(dataInput.jenis_test.length < 1) {
          valid = false;
          error["jenis_test"] = "Jenis test harus dipilih !";
        }

        this.setState({
            errors: error,
            errorMsg : (empty) ? "Data tidak boleh kosong." : ""
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

    async handleExport(route) {
        let { filterID } = this.state;
        let payload = {
            route : route,
            params : filterID
        }
        this.setState({
            loadingDownload: true,
            showModal: "waitDownload"
        });
        this.props.exportPeserta(payload).then(() => {
            this.setState({
                loadingDownload: false,
                showModal: false
            });
        });
    }

    handleImportPeserta() {
      this.hiddenFileInput.click();
    }

    handleFileInput(e) {
        e.preventDefault();
        this.setState({loadingData:true});
        const data = new FormData();
        data.append('jadwal_test', this.state.filterID);
        data.append('user', e.target.files[0]);
        let jenisTest = [];
        if (this.state.uploadIST) {
            jenisTest.push('IST');
        }
        if (this.state.uploadMII) {
            jenisTest.push('MII');
        }
        data.append('jenis_test', jenisTest.join(','));
        this.props.uploadPeserta(data).then((result) => {
            if (result.status !== "OK" && result.data && result.data.length > 0) {
                this.setState({
                    errorUpload: result.data,
                    showModal: "errorUpload"
                });
            }
            this.setState({loadingData:false});
        });
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
                jenis_test: [],
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
                jenis_test: row.jenis_test,
                valid,
                expired,
            },
            errors: {},
        });

    }

    handleCheckIST(e) {
        this.setState({
          uploadIST: e.target.checked
        });
    }

    handleCheckMII(e) {
        this.setState({
          uploadMII: e.target.checked
        });
    }

    actionFormatter(e, row) {
        return (
            <div className="btn-group">
                <ButtonIcon white onClick={()=>this.handleClickButtonAction("editPeserta",row)}>
                    <img src={require("../../assets/images/edit.svg")} />
                </ButtonIcon>
                <ButtonIcon white onClick={()=>this.handleClickButtonAction("resetPeserta",row)}>
                    <img src={require("../../assets/images/reset.svg")} />
                </ButtonIcon>
                <ButtonIcon white onClick={()=>this.handleClickButtonAction("hapusPeserta",row)}>
                    <img src={require("../../assets/images/delete.svg")} />
                </ButtonIcon>
            </div>
        )
    }

    switchModal() {
        switch(this.state.showModal) {
            case "addPeserta" :
                return (
                    <ModalPeserta
                        handleClickModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        handleChangeJenisTest={this.handleChangeJenisTest}
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
            case "editPeserta" :
                return (
                    <ModalPeserta
                        handleClickModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        handleChangeJenisTest={this.handleChangeJenisTest}
                        dataInput={this.state.dataInput}
                        errors={this.state.errors}
                        disabled={this.state.disabled}
                        handleSubmit={this.handleEdit}
                        handleChangeDate={this.handleChangeDate}
                        errorMsg={this.state.errorMsg}
                        isLoading={this.state.isLoading}
                    />
                );
            case "resetPeserta" :
                return (
                    <ModalResetJawaban
                        handleClickModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        dataInput={this.state.dataInput}
                        handleCloseModal={this.handleCloseModal}
                    />
                );
            case "hapusPeserta" :
                return (
                    <ModalHapus
                        type="peserta"
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleHapus={this.handleHapus}
                        isLoading={this.state.isLoading}
                    />
                );
            case "errorUpload" :
                return (
                    <ModalErrorUpload
                        error={this.state.errorUpload}
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                    />
                );
            case "waitDownload" :
                return (
                    <ModalWaitDownload
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                    />
                );
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
                    <div className="d-flex pl-2">
                        <h5><b>ID - Jadwal: </b></h5>
                        <span>&emsp;{this.state.filterID} - {this.state.filter}</span>
                    </div>
                    <div className="d-flex pr-2">
                        <h5><b>Jumlah Peserta: </b></h5>
                        <span>&emsp;{this.state.data ? this.state.data.length : 0} (Max 1500) </span>
                    </div>
                </Header>
                <Header>
                    <div>
                        <Button white
                          onClick={()=>this.handleExport("peserta-test/")}
                          disabled={this.state.filterID === "" || this.state.loadingDownload}>
                          <img src={download} />
                          Export Peserta
                        </Button>
                        <Button white
                            onClick={()=>this.handleExport("jawaban-test/")}
                            disabled={this.state.filterID === "" || this.state.loadingDownload}>
                            <img src={download} />
                            Export Jawaban
                        </Button>
                        <Button white
                          onClick={()=>this.handleExport("hasil-test/")}
                          disabled={this.state.filterID === "" || this.state.loadingDownload}>
                          <img src={download} />
                          Export Hasil
                        </Button>
                    </div>
                    <div>
                        <div className="form-check form-check-inline" style={{border: '1px solid red', padding: '5px'}}>
                            <label className="form-check-label mr-2">Jenis Test: </label>
                            <input type="checkbox" className="form-check-input mr-1"
                            id="ist"
                            name="IST"
                            onChange={this.handleCheckIST.bind(this)}
                            />
                            <label className="form-check-label mr-1">IST</label>
                            <input type="checkbox" className="form-check-input mr-1"
                            id="mii"
                            name="MII"
                            onChange={this.handleCheckMII.bind(this)}
                            />
                            <label className="form-check-label mr-1">MII</label>
                            <Button white
                            onClick={()=>this.handleImportPeserta()}
                            disabled={this.state.filterID === "" || (this.state.uploadIST === false && this.state.uploadMII === false)
                                || this.state.loadingData || (this.state.data && this.state.data.length >= 1500)}>
                            <img src={upload} />
                            Import Peserta
                            </Button>
                            <input type="file"
                            ref={input => this.hiddenFileInput = input}
                            onChange={this.handleFileInput.bind(this)}
                            style={{display:'none'}}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                        </div>
                        <Button
                            style={{width:"150px"}}
                            onClick={this.handleClickModal}
                            disabled={this.state.filterID === "" || (this.state.data && this.state.data.length >= 1500)}>
                            <img src={plus} />
                            Input Peserta
                        </Button>
                    </div>
                </Header>
                {
                    (this.state.filterID !== "") ?
                    (this.state.loadingData) ?
                    <Loading /> :
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
        dispatch({ type: 'peserta/hapusPeserta', payload: value }),
    uploadPeserta: value =>
        dispatch({ type: 'peserta/uploadPeserta', payload: value }),
});


export default connect(mapState, mapDispatch)(Peserta)
