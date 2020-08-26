import React, { Component } from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"

const ModalUserAdmin = (props) => {
    return (
        <div className="modal" style={{display: (props.showModal) ? "block" : "none"}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content ">
                    <h5>{props.title}</h5>
                    
                    <form>
                        <div className="form-group">
                            <label>Nama</label>
                            <input
                                className={`form-control ${props.errors.nama ? "invalid" : ""}`}
                                id="nama"
                                type="text"
                                value={props.nama}
                                onChange={props.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className={`form-control ${props.errors.email ? "invalid" : ""}`}
                                id="email"
                                type="text"
                                value={props.email}
                                onChange={props.handleChange}
                            />
                        </div>
                        {
                            (props.title !== "Ubah Password") ?
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className={`form-control ${props.errors.password ? "invalid" : ""}`}
                                    id="password"
                                    type="text"
                                    value={props.password}
                                    onChange={props.handleChange}
                                />
                            </div> :
                            <React.Fragment>
                                <div className="form-group">
                                    <label>Password Lama</label>
                                    <input
                                        className={`form-control ${props.errors.oldPassword ? "invalid" : ""}`}
                                        id="oldPassword"
                                        type="text"
                                        value={props.oldPassword}
                                        onChange={props.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        className={`form-control ${props.errors.newPassword ? "invalid" : ""}`}
                                        id="newPassword"
                                        type="text"
                                        value={props.newPassword}
                                        onChange={props.handleChange}
                                    />
                                </div>
                            </React.Fragment>
                        }
                        <Button small onClick={props.handleSubmit}>
                            Selesai
                        </Button>
                    </form>
                </div>
            </div>
            <div className="background" onClick={props.handleCloseModal} />
        </div>
    )
}

export default ModalUserAdmin
