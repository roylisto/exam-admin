import React from 'react';
// ASEETS
import "./Modal.scss"
import eye from "../../assets/images/eye.svg"
import eyeoff from "../../assets/images/eye-closed.svg"
// COMPONENTS
import Button from "../Button"

const ModalUserAdmin = (props) => {
    return (
        <div className="modal" style={{display: (props.showModal) ? "block" : "none"}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content ">
                    <h5>{props.title} User Admin</h5>
                    {
                        (props.errorMsg) ?
                        <div className="alert-text" role="alert">
                            <img src={require("../../assets/images/error.svg")} alt="" />
                            {props.errorMsg}
                        </div> : ""
                    }
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
                            <p>{props.errors.email}</p>
                        </div>
                        {
                            (props.title !== "Edit") ?
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className={`form-control ${props.errors.password ? "invalid" : ""}`}
                                    id="password"
                                    type={props.type}
                                    value={props.password}
                                    onChange={props.handleChange}
                                />
                                <span className="show-hide" onClick={props.showHide}>
                                    <img src={(props.type === "text") ? eye : eyeoff} alt="eye"/>
                                </span>
                                <p>{props.errors.password}</p>
                            </div> 
                            :
                            <div className="form-group">
                                <label>Password Baru</label>
                                <input
                                    className={`form-control ${props.errors.newPassword ? "invalid" : ""}`}
                                    id="newPassword"
                                    type={props.type}
                                    value={props.newPassword}
                                    onChange={props.handleChange}
                                />
                                <div className="show-hide" onClick={props.showHide}>
                                    <img src={(props.type === "text") ? eye : eyeoff} alt="eye"/>
                                </div>
                                <p>{props.errors.newPassword}</p>
                            </div>
                        }
                        <Button small onClick={props.handleSubmit}>
                            {
                                (props.isLoading) ? 
                                <div className="spinner-border spinner-border-sm" role="status"></div> : "Selesai"
                            }
                        </Button>
                    </form>
                </div>
            </div>
            <div className="background" onClick={props.handleCloseModal} />
        </div>
    )
}

export default ModalUserAdmin
