import React from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"

class ModalResetJawaban extends React.Component {

    render(){
        return (
            <div className="modal" style={{display: (this.props.showModal) ? "block" : "none"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <h5>Reset Jawaban</h5>
                        {
                            (this.props.errorMsg) ?
                            <div className="alert-text" role="alert">
                                <img src={require("../../assets/images/error.svg")} alt="" />
                                {this.props.errorMsg}
                            </div> : ""
                        }
                        <form>
                            <div className={`form-group ${(this.props.handleCek)? "mb-5":""}`}>
                                <label>ID</label>
                                <input
                                    className={`form-control ${this.props.errors.email ? "invalid" : ""}`}
                                    id="id"
                                    type="text"
                                    value={this.props.dataInput.id}
                                    readOnly={true}
                                />
                            </div>
                            <div className={`form-group ${(this.props.handleCek)? "mb-5":""}`}>
                                <label>Email</label>
                                <input
                                    className={`form-control ${this.props.errors.email ? "invalid" : ""}`}
                                    id="email"
                                    type="email"
                                    value={this.props.dataInput.email}
                                    readOnly={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nama</label>
                                <input
                                    className={`form-control ${this.props.errors.nama ? "invalid" : ""}`}
                                    id="nama"
                                    type="text"
                                    value={this.props.dataInput.nama}
                                    readOnly={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Jenis Test</label>
                                <p>{this.props.errors.jenis_test}</p>
                                <div
                                  className={`form-control form-check form-check-inline ${this.props.errors.jenis_test ? "invalid" : ""}`}
                                >
                                  <input type="checkbox" className="form-check-input"
                                    id="ist"
                                    name="IST"
                                    defaultChecked={this.props.dataInput.jenis_test ? this.props.dataInput.jenis_test.indexOf('IST') > -1 : false}
                                    onChange={this.props.handleChangeJenisTest}
                                    />
                                  <label className="form-check-label">IST</label>
                                  <input type="checkbox" className="form-check-input"
                                    id="mii"
                                    name="MII"
                                    defaultChecked={this.props.dataInput.jenis_test ? this.props.dataInput.jenis_test.indexOf('MII') > -1 : false}
                                    onChange={this.props.handleChangeJenisTest}
                                    />
                                  <label className="form-check-label">MII</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                              <Button small onClick={this.props.handleSubmit} disabled={this.props.disabled}>
                                {
                                  (this.props.isLoading) ?
                                  <div className="spinner-border spinner-border-sm" role="status"></div> : "Selesai"
                                }
                              </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="background" onClick={this.props.handleClickModal} />
            </div>
        )
    }
}

export default ModalResetJawaban;