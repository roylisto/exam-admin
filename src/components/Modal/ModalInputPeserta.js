import React from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"
import DatePicker from 'react-datepicker'
// ASSETS
import calendar from "../../assets/images/calendar.png"

class ModalInputPeserta extends React.Component { 

    componentDidMount() {
        document.getElementById("tanggal_lahir").setAttribute("autocomplete","off");
        if(this.props.showModal === "editPeserta"){
            document.getElementById("valid").setAttribute("autocomplete","off");
            document.getElementById("expired").setAttribute("autocomplete","off");
        }
    }
    render(){

        return (
            <div className="modal" style={{display: (this.props.showModal) ? "block" : "none"}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content ">
                        <h5>Input Peserta</h5>
                        {
                            (this.props.errorMsg) ?
                            <div className="alert-text" role="alert">
                                <img src={require("../../assets/images/error.svg")} alt="" />
                                {this.props.errorMsg}
                            </div> : ""
                        }
                        <form>
                            <div className={`form-group ${(this.props.handleCek)? "mb-5":""}`}>
                                <label>Email</label>
                                <input
                                    className={`form-control ${this.props.errors.email ? "invalid" : ""}`}
                                    id="email"
                                    type="email"
                                    value={this.props.dataInput.email}
                                    onChange={this.props.handleChange}
                                    onFocus={this.props.onFocus}
                                />
                                <p>{this.props.errors.email}</p>
                                {
                                    (this.props.handleCek) ? 
                                    <Button small xs className="float-right" onClick={this.props.handleCek}>
                                        {
                                            (this.props.isLoading) ? 
                                            <div className="spinner-border spinner-border-sm" role="status"></div> 
                                            : "Cek"
                                        }
                                    </Button> : ""
                                }
                            </div>
                            <div className="form-group">
                                <label>Nama</label>
                                <input
                                    className={`form-control ${this.props.errors.nama ? "invalid" : ""}`}
                                    id="nama"
                                    type="text"
                                    value={this.props.dataInput.nama}
                                    onChange={this.props.handleChange}
                                    disabled={this.props.disabled}
                                />
                            </div>
                            <div className="form-group">
                                <label>No HP</label>
                                <input
                                    className={`form-control ${this.props.errors.no_hp ? "invalid" : ""}`}
                                    id="no_hp"
                                    type="tel"
                                    value={this.props.dataInput.no_hp}
                                    onChange={this.props.handleChange}
                                    disabled={this.props.disabled}
                                />
                                <p>{this.props.errors.no_hp}</p>
                            </div>
                            <div className="form-group">
                                <label>Jenis Kelamin</label>
                                <select
                                    className={`form-control ${this.props.errors.jenis_kelamin ? "invalid" : ""}`}
                                    id="jenis_kelamin"
                                    type="text"
                                    value={this.props.dataInput.jenis_kelamin}
                                    onChange={this.props.handleChange}
                                    disabled={this.props.disabled}
                                >
                                    <option value="">-</option>
                                    <option value="pria">Pria</option>
                                    <option value="wanita">Wanita</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tanggal lahir</label>
                                <DatePicker
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="MM/dd/yyyy"
                                    className={`form-control input-icon ${this.props.errors.tanggal_lahir ? "invalid" : ""}`}
                                    id="tanggal_lahir"
                                    placeholderText="MM/DD/YYYY"
                                    selected={this.props.dataInput.tanggal_lahir}
                                    onChange={date=>this.props.handleChangeDate(date,"tanggal_lahir")}
                                    disabled={this.props.disabled}
                                />
                                <img src={calendar} />
                            </div>
                            <div className="form-group">
                                <label>Kelompok</label>
                                <input
                                    className={`form-control ${this.props.errors.kelompok ? "invalid" : ""}`}
                                    id="kelompok"
                                    type="text"
                                    value={this.props.dataInput.kelompok}
                                    onChange={this.props.handleChange}
                                    disabled={this.props.disabled}
                                />
                            </div>
                            <div className="form-group">
                                <label>Instansi</label>
                                <input
                                    className={`form-control ${this.props.errors.instansi ? "invalid" : ""}`}
                                    id="instansi"
                                    type="text"
                                    value={this.props.dataInput.instansi}
                                    onChange={this.props.handleChange}
                                    disabled={this.props.disabled}
                                />
                            </div>
                            {
                                (this.props.showModal === "editPeserta") ?
                                <React.Fragment>
                                    <div className="form-group">
                                        <label>Valid</label>
                                        <DatePicker
                                            showTimeInput
                                            // shouldCloseOnSelect={false}
                                            dateFormat="MM/dd/yyyy hh:mm aa"
                                            className={`form-control input-icon ${this.props.errors.valid ? "invalid" : ""}`}
                                            id="valid"
                                            placeholderText="MM/DD/YYYY"
                                            selected={this.props.dataInput.valid}
                                            onChange={date=>this.props.handleChangeDate(date,"valid")}
                                        />
                                        <img src={calendar} />
                                    </div>
                                    <div className="form-group">
                                        <label>Expired</label>
                                        <DatePicker
                                            showTimeInput
                                            // shouldCloseOnSelect={false}
                                            dateFormat="MM/dd/yyyy hh:mm aa"
                                            className={`form-control input-icon ${this.props.errors.expired ? "invalid" : ""}`}
                                            id="expired"
                                            placeholderText="MM/DD/YYYY"
                                            selected={this.props.dataInput.expired}
                                            onChange={date=>this.props.handleChangeDate(date,"expired")}
                                        />
                                        <img src={calendar} />
                                    </div> 
                                </React.Fragment> : ""
                            }
                            <Button small onClick={this.props.handleSubmit} disabled={this.props.disabled}>
                                {
                                    (this.props.isLoading) ? 
                                    <div className="spinner-border spinner-border-sm" role="status"></div> : "Selesai"
                                }
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="background" onClick={this.props.handleClickModal} />
            </div>
        )
    }
}

export default ModalInputPeserta