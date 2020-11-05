import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
// ASSETS
import "./Tabel.scss"
import Loading from "../../components/Loading"

const Tabel = (props) => {
    const options = {
        paginationSize: 10,
        pageStartIndex: 1,
        alwaysShowAllBtns: true, // Always show next and previous button
        withFirstAndLast: false, // Hide the going to First and Last page button
        hideSizePerPage: true, // Hide the sizePerPage dropdown always
        hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        prePageText: '<',
        nextPageText: '>',
        disablePageTitle: true,
    };
    if(props.data && props.columns) {
        return (
            <BootstrapTable
                keyField={props.keyField}
                data={ props.data }
                columns={ props.columns }
                bootstrap4
                noDataIndication="Table is Empty"
                classes={props.tableName}
                wrapperClasses="table-wraper"
                bordered={ false }
                pagination={ paginationFactory(options)}
                filter = {filterFactory()}
            />
        )
    }
    else {
        return <Loading />
    }
}

export default Tabel
