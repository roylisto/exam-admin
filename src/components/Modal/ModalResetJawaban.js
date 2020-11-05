import React from 'react';
import "./Modal.scss"
// COMPONENTS
import Button from "../Button"
import { connect } from 'react-redux';
import { alertNotification } from "../../modules/utils";

class ModalResetJawaban extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
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

    handleChecklistIST(e) {
      const data = this.state.ist.find((i) => i.key === e.target.name);
      data.checked = e.target.checked;
      this.setState({
        ist: Object.assign([...this.state.ist], {data}),
      })
    }

    handleCheckAllIST(e) {
      let data = [...this.state.ist];
      data = data.map((d) => {
        d.checked = e.target.checked;
        return d;
      });
      this.setState({
        ist: data,
      });
    }

    handleChecklistMII(e) {
      const data = this.state.mii.find((i) => i.key === e.target.name);
      data.checked = e.target.checked;
      this.setState({
        mii: Object.assign([...this.state.mii], {data}),
      })
    }

    handleCheckAllMII(e) {
      let data = [...this.state.mii];
      data = data.map((d) => {
        d.checked = e.target.checked;
        return d;
      });
      this.setState({
        mii: data,
      });
    }

    handleResetJawaban(e) {
      e.preventDefault();
      this.setState({
        isLoading: true,
      });
      const ist = this.state.ist.filter((i) => {
        return i.checked === true;
      });

      const mii = this.state.mii.filter((i) => {
        return i.checked === true;
      });

      const data = [...ist, ...mii];
      const resetPromises = [];
      data.forEach((item, index) => {
        resetPromises.push(this.props.resetJawaban({
          peserta_id: this.props.dataInput.id,
          subtest: item.key,
        }))
      });
      Promise.all(resetPromises)
        .then(() => {
          alertNotification(
            "success",
            "",
            "Data berhasil direset."
          );
          this.setState({
            isLoading: false,
          });
          this.props.handleCloseModal();
        });
    }

    render(){
      const invalidReset = () => {
        const ist = this.state.ist.find((i) => {
          return i.checked === true;
        });

        const mii = this.state.mii.find((i) => {
          return i.checked === true;
        });

        if (ist || mii) {
          return false;
        }
        return true;
      }
        return (
            <div className="modal" style={{display: (this.props.showModal) ? "block" : "none"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <h5>Reset Jawaban</h5>
                        <form>
                            <div className={`form-group`}>
                                <label>ID</label>
                                <input
                                    className={`form-control`}
                                    id="id"
                                    type="text"
                                    value={this.props.dataInput.id}
                                    readOnly={true}
                                />
                            </div>
                            <div className={`form-group`}>
                                <label>Email</label>
                                <input
                                    className={`form-control`}
                                    id="email"
                                    type="email"
                                    value={this.props.dataInput.email}
                                    readOnly={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nama</label>
                                <input
                                    className={`form-control`}
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
                                  <div
                                    className={`mt-0 form-control form-check form-check-inline d-inline-block`}
                                  >
                                    <input type="checkbox" className="form-check-input"
                                      name="check_all_ist"
                                      onChange={this.handleCheckAllIST.bind(this)}
                                    />
                                    <label className="form-check-label">Pilih Semua</label>
                                    {this.state.ist.map((item, index) => {
                                      return <div key={index}>
                                              <input type="checkbox" className="form-check-input"
                                                name={item.key}
                                                onChange={this.handleChecklistIST.bind(this)}
                                                checked={item.checked || false}
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
                                  <div
                                    className={`mt-0 form-control form-check form-check-inline d-inline-block`}
                                  >
                                    <input type="checkbox" className="form-check-input"
                                      name="check_all_mii"
                                      onChange={this.handleCheckAllMII.bind(this)}
                                    />
                                    <label className="form-check-label">Pilih Semua</label>
                                    {this.state.mii.map((item, index) => {
                                      return <div key={index}>
                                              <input type="checkbox" className="form-check-input"
                                                name={item.key}
                                                onChange={this.handleChecklistMII.bind(this)}
                                                checked={item.checked || false}
                                              />
                                              <label className="form-check-label">{item.label}</label>
                                            </div>
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <Button small onClick={this.handleResetJawaban.bind(this)} disabled={invalidReset()}>
                                {
                                  (this.state.isLoading) ?
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

const mapState = state => ({});

const mapDispatch = dispatch => ({
  resetJawaban: value =>
      dispatch({ type: 'peserta/resetJawaban', payload: value })
});


export default connect(mapState, mapDispatch)(ModalResetJawaban);