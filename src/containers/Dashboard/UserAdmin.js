import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// ASSETS
import pluspeople from "../../assets/images/pluspeople.svg"
// COMPONENTS
import TabelJadwal from "../../components/Tabel/Tabel";
import Button from '../../components/Button';
import Modal from "../../components/Modal/ModalUserAdmin";
import ModalHapus from '../../components/Modal/ModalHapus';
// MODULS
import { numberFormatter, emailFormatter, formatPassword } from "../../modules/Formatter";

const Header = styled.div`{
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding : 30px 10px 15px;
    h4 {
        font-weight: bold;
    }
    button {
        width: 220px;
    }
}`;

class UserAdmin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data,
            columns: null,
            showModal: '',
            errors: {},
            nama: '',
            email : '',
            password : '',
            newPassword: '',
            errorMsg: '',
            id: '',
            type:"password"
        }
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddUserAdmin = this.handleAddUserAdmin.bind(this);
        this.handleEditAdmin = this.handleEditAdmin.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.handleHapus = this.handleHapus.bind(this);
        this.showHide = this.showHide.bind(this);
    }

    componentDidMount() {
        const columns = [
            { dataField: 'id', text: 'ID',
                formatter: (data) => numberFormatter(data, this.props.data) },
            { dataField: 'name', text: 'Nama' },
            { dataField: 'email', text: 'Email' },
            { dataField: '', text: 'Action',
                formatter: this.actionFormatter },
        ]
        this.setState({ columns });
        this.props.fetchListAdmin();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data && this.props.data.length !== 0) {
            this.setState({
                data: this.props.data,
            });
        }
        if (prevProps.errorMsg !== this.props.errorMsg && this.props.errorMsg !== "") {
            this.setState({
                errorMsg: this.props.errorMsg,
            });
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value,
            errors: { [e.target.id]: false }
        })
    }

    handleClickModal(modal, row) {
        this.setState({
            showModal: modal,
            nama: (row) ? row.name : '',
            email: (row) ? row.email : '',
            id: (row) ? row.id : '',
            errors: {},
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            errors: {},
            nama: '',
            email : '',
            password : '',
            newPassword: '',
            errorMsg: '',
            type: "password"
        })
    }
    
    formValidate(dataInput) {
        let { showModal, email, newPassword, password, } = this.state;
        
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
        
        if(!emailFormatter(email)){
            valid = false;
            error["email"] = "Format email salah !";
        }

        if(showModal === "addUserAdmin"){
            // Condition for add user admin
            if(!formatPassword(password)){
                valid = false;
                error["password"] = "Format password salah ! Password minimal terdiri dari 8 karakter, merupakan gabungan angka dan huruf";
            }
        }
        else {
            if(!formatPassword(newPassword) && newPassword !== ""){
                valid = false;
                error["newPassword"] = "Format password salah ! Password minimal terdiri dari 8 karakter, merupakan gabungan angka dan huruf";
            }
        }

        this.setState({ 
            errors: error,
            errorMsg : (empty) ? "Data tidak boleh kosong." : ""
        });
        return valid
    }

    handleAddUserAdmin(e) {
        e.preventDefault();
        let { nama, email, password } = this.state
        let dataInput = { nama, email, password }

        if(!this.formValidate(dataInput)) return;
        
        const payload = {
            name: nama,
            email: email,
            password: password,
        };
        this.props.addUserAdmin(payload);
    }

    handleEditAdmin(e) {
        e.preventDefault();
        let { nama, email, newPassword, id} = this.state
        let password = newPassword;
        let name = nama;
        let dataInput = {name, email, password};
        let propertyNames = Object.keys(dataInput);
        let propertyValues = Object.values(dataInput);
        let payload = {}
        
        if(!this.formValidate({})) return;
        
        for(let i = 0; i<propertyNames.length; i++){
            if(propertyValues[i] !== ""){
                payload[propertyNames[i]] = propertyValues[i];
            }
        }
        const data = {
            payload,
            id: id
        }
        
        this.props.editUserAdmin(data);
    }
    
    handleHapus() {
        let { id } = this.state;
        
        this.props.hapusUserAdmin(id);
    }
        
    showHide() {
        this.setState({
          type: this.state.type === "text" ? "password" : "text"
        });
    }
    
    actionFormatter(e, row) {
        return (
            <div className="btn-group">
                <Button white xs onClick={()=>this.handleClickModal("editUserAdmin",row)}>
                    <img src={require("../../assets/images/edit.svg")} />
                    Edit User Admin
                </Button>
                <Button white small xs onClick={()=>this.handleClickModal("hapusUserAdmin",row)}>
                    <img src={require("../../assets/images/delete.svg")} />
                    Hapus
                </Button>
            </div>
        )
    }
    
    switchModal() {
        switch(this.state.showModal) {
            case "addUserAdmin" : 
                return (
                    <Modal
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleAddUserAdmin}
                        errors={this.state.errors}
                        title="Tambah"
                        errorMsg={this.state.errorMsg}
                        showHide={this.showHide}
                        type={this.state.type}
                    />
                );
                break;
            case "editUserAdmin" : 
                return (
                    <Modal
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleEditAdmin}
                        errors={this.state.errors}
                        title="Edit"
                        nama={this.state.nama}
                        email={this.state.email}
                        newPassword={this.state.newPassword}
                        errorMsg={this.state.errorMsg}
                        showHide={this.showHide}
                        type={this.state.type}
                    />
                );
                break;
            case "hapusUserAdmin" : 
                return (
                    <ModalHapus
                        type="user admin"
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
                    <h4>Add User Admin</h4>
                    <Button onClick={()=>this.handleClickModal("addUserAdmin")}>
                        <img src={pluspeople} alt="+"/>
                        Tambah User Admin
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
    data: state.admin.userAdminList,
    errorMsg: state.admin.errorMsg,
})

const mapDispatch = dispatch => ({
    fetchListAdmin: () =>
        dispatch({ type: 'admin/fetchListAdmin' }),
    addUserAdmin: value =>
        dispatch({ type: 'admin/addUserAdmin', payload: value }),
    editUserAdmin: (value) =>
        dispatch({ type: 'admin/editUserAdmin', payload: value }),
    hapusUserAdmin: (value) =>
        dispatch({ type: 'admin/hapusUserAdmin', payload: value }),
});

export default connect(mapState, mapDispatch)(UserAdmin)
