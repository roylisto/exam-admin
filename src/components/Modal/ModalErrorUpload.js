import React from 'react';

// ASSETS
import "./Modal.scss"

const ModalErrorUpload = (props) => {
    return (
        <div className="modal" style={{display: (props.showModal) ? "block" : "none"}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <thead style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                      <tr>
                        <th>Email</th>
                        <th>No Hp</th>
                        <th>Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        props.error.map((e) =>
                          <tr style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}
                            key={e.email}>
                            <td>{e.email}</td>
                            <td>{e.no_hp}</td>
                            <td style={{"color": "red"}}>{e.error}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
            </div>
            <div className="background" onClick={props.handleCloseModal} />
        </div>
    )
}

export default ModalErrorUpload
