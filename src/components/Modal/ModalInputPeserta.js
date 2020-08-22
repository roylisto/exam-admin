import React from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"
import DatePicker from 'react-datepicker'
// ASSETS
import calendar from "../../assets/images/calendar.png"

const ModalInputPeserta = props => {
    return (
        <div className="modal" style={{display: (props.showModal) ? "block" : "none"}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content ">
                    <h5>Input Peserta</h5>
                    <form>
                        <div className="form-group mb-5">
                            <label>Email</label>
                            <input
                                className={`form-control ${props.errors.email ? "invalid" : ""}`}
                                id="email"
                                type="email"
                                value={props.dataInput.email}
                                onChange={props.handleChange}
                            />
                            <Button small xs className="float-right mt-2" onClick={props.handleCek}>
                                Cek
                            </Button>
                        </div>
                        <div className="form-group">
                            <label>Nama</label>
                            <input
                                className={`form-control ${props.errors.nama ? "invalid" : ""}`}
                                id="nama"
                                type="text"
                                value={props.dataInput.nama}
                                onChange={props.handleChange}
                                disabled={props.disabled}
                            />
                        </div>
                        <div className="form-group">
                            <label>No HP</label>
                            <input
                                className={`form-control ${props.errors.no_hp ? "invalid" : ""}`}
                                id="no_hp"
                                type="tel"
                                value={props.dataInput.no_hp}
                                onChange={props.handleChange}
                                disabled={props.disabled}
                            />
                        </div>
                        <div className="form-group">
                            <label>Jenis Kelamin</label>
                            <select
                                className={`form-control ${props.errors.jenis_kelamin ? "invalid" : ""}`}
                                id="jenis_kelamin"
                                type="text"
                                value={props.dataInput.jenis_kelamin}
                                onChange={props.handleChange}
                                disabled={props.disabled}
                            >
                                <option>-</option>
                                <option value="pria">Pria</option>
                                <option value="wanita">Wanita</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tanggal lahir</label>
                            <DatePicker
                                dateFormat="MM/dd/yyyy"
                                className={`form-control input-icon ${props.errors.tanggal_lahir ? "invalid" : ""}`}
                                id="tanggal_lahir"
                                placeholderText="MM/DD/YYYY"
                                selected={props.dataInput.tanggal_lahir}
                                onChange={date=>props.handleChangeDate(date)}
                                disabled={props.disabled}
                            />
                            <img src={calendar} />
                        </div>
                        <div className="form-group">
                            <label>Kelompok</label>
                            <input
                                className={`form-control ${props.errors.kelompok ? "invalid" : ""}`}
                                id="kelompok"
                                type="text"
                                value={props.dataInput.kelompok}
                                onChange={props.handleChange}
                                disabled={props.disabled}
                            />
                        </div>
                        <div className="form-group">
                            <label>Instansi</label>
                            <input
                                className={`form-control ${props.errors.instansi ? "invalid" : ""}`}
                                id="instansi"
                                type="text"
                                value={props.dataInput.instansi}
                                onChange={props.handleChange}
                                disabled={props.disabled}
                            />
                        </div>
                        <Button small onClick={props.handleSubmit} disabled={props.disabled}>
                            Selesai
                        </Button>
                    </form>
                </div>
            </div>
            <div className="background" onClick={props.handleClickModal} />
        </div>
    )
}

export default ModalInputPeserta