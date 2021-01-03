import React from 'react';

// ASSETS
import "./Modal.scss"

const ModalWaitDownload = (props) => {
    return (
        <div className="modal" style={{display: (props.showModal) ? "block" : "none"}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <h3>Please Wait</h3>
                  <span>Your download content is being processed</span>
                </div>
            </div>
            <div className="background" onClick={props.handleCloseModal} />
        </div>
    )
}

export default ModalWaitDownload
