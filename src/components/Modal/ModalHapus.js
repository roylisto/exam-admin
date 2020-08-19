import React from 'react';
// COMPONENTS
import Button from "../Button"
// ASSETS
import "./Modal.scss"

const ModalHapus = (props) => {
    return (
        <div className="modal" style={{display: (props.showModal) ? "block" : "none"}}>
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content modal-hapus">
                    <p>Anda yakin akan menghapus<br /> jadwal ini ? </p>
                    <div>
                        <Button white small xs onClick={props.handleHapus}>
                            Ya
                        </Button>
                        <Button white small xs onClick={props.handleCloseModal}>
                            Tidak
                        </Button>
                    </div>
                </div>
            </div>
            <div className="background" onClick={props.handleCloseModal} />
        </div>
    )
}

export default ModalHapus
