import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next' 
import paginationFactory from 'react-bootstrap-table2-paginator';
// ASSETS
import "./Tabel.scss"
import Loading from "../../components/Loading"

const Tabel = (props) => {
    const options = {
        paginationSize: 4,
        pageStartIndex: 1,
        alwaysShowAllBtns: true, // Always show next and previous button
        withFirstAndLast: false, // Hide the going to First and Last page button
        hideSizePerPage: true, // Hide the sizePerPage dropdown always
        hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        prePageText: '<',
        nextPageText: '>',
        disablePageTitle: true,
    };
    if(props.data) {
        return (
            <BootstrapTable 
                keyField='id' 
                data={ props.data } 
                columns={ props.columns } 
                bootstrap4
                noDataIndication="Table is Empty"
                classes={props.tableName}
                bordered={ false }
                pagination={ paginationFactory(options)}
            />
        )
    }
    else {
        return <Loading />
    }
}

export default Tabel
