import React from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"

class ModalResetJawaban extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ist: [
          { label: 'Subtest 1', key: 'subtest_1_ist' },
          { label: 'Subtest 2', key: 'subtest_2_ist' },
          { label: 'Subtest 3', key: 'subtest_3_ist' },
          { label: 'Subtest 4', key: 'subtest_4_ist' },
          { label: 'Subtest 5', key: 'subtest_5_ist' },
          { label: 'Subtest 6', key: 'subtest_6_ist' },
          { label: 'Subtest 7', key: 'subtest_7_ist' },
          { label: 'Subtest 8', key: 'subtest_8_ist' },
          { label: 'Subtest 9', key: 'subtest_9_ist' }
        ],
        mii: [
          { label: 'Bagian 1', key: 'bagian_1_verb_ling' },
          { label: 'Bagian 2', key: 'bagian_2_log_math' },
          { label: 'Bagian 3', key: 'bagian_3_spat' },
          { label: 'Bagian 4', key: 'bagian_4_mus' },
          { label: 'Bagian 5', key: 'bagian_5_bod_kin' },
          { label: 'Bagian 6', key: 'bagian_6_inter' },
          { label: 'Bagian 7', key: 'bagian_7_intra' },
          { label: 'Bagian 8', key: 'bagian_8_nat' }
        ],
      }
    }

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
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>IST</label>
                                  <p>{this.props.errors.jenis_test}</p>
                                  <div
                                    className={`mt-0 form-control form-check form-check-inline d-inline-block ${this.props.errors.jenis_test ? "invalid" : ""}`}
                                  >
                                    {this.state.ist.map((item, index) => {
                                      return <div key={index}>
                                              <input type="checkbox" className="form-check-input"
                                                id="ist"
                                                name={item.key}
                                              />
                                              <label className="form-check-label">{item.label}</label>
                                            </div>
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>MII</label>
                                  <p>{this.props.errors.jenis_test}</p>
                                  <div
                                    className={`mt-0 form-control form-check form-check-inline d-inline-block ${this.props.errors.jenis_test ? "invalid" : ""}`}
                                  >
                                    {this.state.mii.map((item, index) => {
                                      return <div key={index}>
                                              <input type="checkbox" className="form-check-input"
                                                id="mii"
                                                name={item.key}
                                              />
                                              <label className="form-check-label">{item.label}</label>
                                            </div>
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <Button small onClick={this.props.handleSubmit}>
                                {
                                  (this.props.isLoading) ?
                                  <div className="spinner-border spinner-border-sm" role="status"></div> : "Reset"
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