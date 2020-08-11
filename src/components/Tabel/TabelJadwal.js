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
            { dataField: 'id', text: 'ID'}, 
            { dataField: 'instansi', text: 'Instansi'}, 
            { dataField: 'start_time', text: 'Waktu Mulai'}, 
            { dataField: 'end_time', text: 'Waktu Berakhir'}, 
            { dataField: 'ket', text: 'Keterangan'}, 
        ];
          
        return (
            <BootstrapTable 
                keyField='id' 
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
