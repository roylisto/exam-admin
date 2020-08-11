import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next' 
// ASSETS
import "./Tabel.scss"

class TabelPeserta extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data : []
        }
    }
    
    render() {
        const columns = [
            { dataField: 'Email', text: 'Email'}, 
            { dataField: 'Nama', text: 'Nama'}, 
            { dataField: 'no_hp', text: 'No HP'}, 
            { dataField: 'jk', text: 'Jenis Kelamin'}, 
            { dataField: 'tgl_lahir', text: 'Tanggal Lahir'}, 
            { dataField: 'kelompok', text: 'Kelompok'}, 
            { dataField: 'instansi', text: 'Instansi'}, 
        ];
          
        return (
            <BootstrapTable 
                keyField='Email' 
                data={ this.state.data } 
                columns={ columns } 
                bootstrap4
                noDataIndication="Table is Empty"
                classes="tabel-jadwal"
                bordered={ false }
            />
        )
    }
}

export default TabelPeserta
