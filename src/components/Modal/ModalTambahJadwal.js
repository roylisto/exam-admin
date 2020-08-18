import React from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"
import DatePicker from 'react-datepicker' // input type datetime local not support in safari or firefox
// ASSETS
import 'react-datepicker/dist/react-datepicker.css'
import calendar from "../../assets/images/calendar.png"

const ModalTambahJadwal = (props) => {
        return (
            <div className="modal" style={{display: (props.showModal) ? "block" : "none"}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content ">
                        <h5>Add Jadwal Test</h5>
                        <form onSubmit={props.handleSubmit}>
                            <div className="form-group">
                                <label>Instansi</label>
                                <input
                                    className="form-control"
                                    id="instansi"
                                    type="text"
                                    value={props.instansi}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Waktu Mulai</label>
                                <DatePicker
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="MM/dd/yyyy hh:mm aa"
                                    className="form-control input-icon"
                                    id="timeStart"
                                    placeholderText="MM/DD/YYYY"
                                    selected={props.timeStart}
                                    onChange={date => props.handleChangeDate(date,"timeStart")}
                                />
                                <img src={calendar} />
                            </div>
                            <div className="form-group">
                                <label>Waktu Berakhir</label>
                                <DatePicker
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="MM/dd/yyyy hh:mm aa"
                                    className="form-control input-icon"
                                    id="timeEnd"
                                    placeholderText="MM/DD/YYYY"
                                    selected={props.timeEnd}
                                    onChange={date => props.handleChangeDate(date,"timeEnd")}
                                />
                                <img src={calendar} />
                            </div>
                            <div className="form-group">
                                <label>Keterangan</label>
                                <input
                                    className="form-control"
                                    id="keterangan"
                                    type="text"
                                    value={props.keterangan}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <Button small onClick={props.handleSubmit}>
                                Selesai
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="background" onClick={props.handleClickModal} />
            </div>
        )
}

export default ModalTambahJadwal
