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
import { numberFormatter } from "../../js/Formatter";

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
            data: null,
            columns: [],
            showModal: '',
            errors: {},
            nama: '',
            email : '',
            password : '',
            oldPassword: '',
            newPassword: '',
        }
        this.handleClickModal = this.handleClickModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddUserAdmin = this.handleAddUserAdmin.bind(this);
        this.handleUbahPassword = this.handleUbahPassword.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.handleHapus = this.handleHapus.bind(this);
    }

    componentDidMount() {
        this.props.fetchListAdmin();
    }

    componentDidUpdate(prevProps) {
        const columns = [
            { dataField: 'id', text: 'ID',
                formatter: (data) => numberFormatter(data, this.props.data) },
            { dataField: 'name', text: 'Nama' },
            { dataField: 'email', text: 'Email' },
            { dataField: '', text: 'Action',
                formatter: this.actionFormatter },
        ]
        if (prevProps.data !== this.props.data && this.props.data.length !== 0) {
            this.setState({
                data: this.props.data,
                columns: columns
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
            oldPassword: '',
            newPassword: '',
        })
    }
    
    formValidate() {
        let { showModal, nama, email, password, oldPassword, newPassword } = this.state;
        let error = {};
        let valid = true;
        
        if (nama === "") {
            valid = false;
            error["nama"] = true;
        }
        if (email === "") {
            valid = false;
            error["email"] = true;
        }
        if(showModal === "addUserAdmin"){
            // Condition form modal add user admin
            if (password === "") {
                valid = false;
                error["password"] = true;
            }
        }
        else {
            // Condition form modal input ubah password
            if (oldPassword === "") {
                valid = false;
                error["oldPassword"] = true;
            }
            if (newPassword === "") {
                valid = false;
                error["newPassword"] = true;
            }
        }

        this.setState({ errors: error });
        return valid
    }

    handleAddUserAdmin(e) {
        e.preventDefault();
        let { nama, email, password } = this.state

        if (this.formValidate()) {
            const payload = {
                name: nama,
                email: email,
                password: password,
            };
            console.log(payload);
            
            // this.props.addJadwalTest(payload);
        }
    }

    handleUbahPassword(e) {
        e.preventDefault();
        let { nama, email, oldPassword, newPassword } = this.state
        if(this.formValidate()) {
            const data = {
                payload: {
                    name: nama,
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                id: id
            }
            console.log(data);
            alert("Ubah Password");
            // this.props.editJadwalTest(data);
        }
    }
    
    handleHapus() {
        let { id } = this.state;
        alert("Hapus");
        // this.props.hapusJadwalTest(id);
    }
    
    actionFormatter(e, row) {
        return (
            <div className="btn-group">
                <Button white xs onClick={()=>this.handleClickModal("ubahPassword",row)}>
                    <img src={require("../../assets/images/edit.svg")} />
                    Ubah Password
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
                        title="Tambah User Admin"
                    />
                );
                break;
            case "ubahPassword" : 
                return (
                    <Modal
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleUbahPassword}
                        errors={this.state.errors}
                        title="Ubah Password"
                        nama={this.state.nama}
                        email={this.state.email}
                        oldPassword={this.state.oldPassword}
                        newPassword={this.state.newPassword}
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
})

const mapDispatch = dispatch => ({
    fetchListAdmin: () =>
        dispatch({ type: 'admin/fetchListAdmin' }),
    addJadwalTest: value =>
        dispatch({ type: 'jadwalTest/addJadwalTest', payload: value }),
    editJadwalTest: (value) =>
        dispatch({ type: 'jadwalTest/editJadwalTest', payload: value }),
    hapusJadwalTest: (value) =>
        dispatch({ type: 'jadwalTest/hapusJadwalTest', payload: value }),
});

export default connect(mapState, mapDispatch)(UserAdmin)
