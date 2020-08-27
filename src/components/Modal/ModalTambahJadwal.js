import React, { Component } from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"
import DatePicker from 'react-datepicker' // input type datetime local not support in safari or firefox
// ASSETS
import calendar from "../../assets/images/calendar.png"

class ModalTambahJadwal extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.getElementById("timeStart").setAttribute("autocomplete","off");
        document.getElementById("timeEnd").setAttribute("autocomplete","off");
    }
    render() {
        return (
            <div className="modal" style={{display: (this.props.showModal) ? "block" : "none"}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content ">
                        <h5>{this.props.title} Jadwal Test</h5>
                        
                        <form>
                            <div className="form-group">
                                <label>Instansi</label>
                                <input
                                    className={`form-control ${this.props.errors.instansi ? "invalid" : ""}`}
                                    id="instansi"
                                    type="text"
                                    value={this.props.instansi}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Waktu Mulai</label>
                                <DatePicker
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="MM/dd/yyyy hh:mm aa"
                                    className={`form-control input-icon ${this.props.errors.timeStart ? "invalid" : ""}`}
                                    id="timeStart"
                                    placeholderText="MM/DD/YYYY"
                                    selected={this.props.timeStart}
                                    onChange={date => this.props.handleChangeDate(date,"timeStart")}
                                />
                                <img src={calendar} />
                            </div>
                            <div className="form-group">
                                <label>Waktu Berakhir</label>
                                <DatePicker
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="MM/dd/yyyy hh:mm aa"
                                    className={`form-control input-icon ${this.props.errors.timeEnd ? "invalid" : ""}`}
                                    id="timeEnd"
                                    placeholderText="MM/DD/YYYY"
                                    selected={this.props.timeEnd}
                                    onChange={date => this.props.handleChangeDate(date,"timeEnd")}
                                />
                                <img src={calendar} />
                                {this.props.errors.timeEndError ? <p>format salah! waktu berakhir harus lebih besar dari waktu mulai.</p> : ""}
                            </div>
                            <div className="form-group">
                                <label>Keterangan</label>
                                <input
                                    className="form-control"
                                    id="keterangan"
                                    type="text"
                                    value={this.props.keterangan}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                            <Button small onClick={this.props.handleSubmit}>
                                Selesai
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="background" onClick={this.props.handleCloseModal} />
            </div>
        )
    }
}

export default ModalTambahJadwal
