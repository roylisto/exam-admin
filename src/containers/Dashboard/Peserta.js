import React, { Component } from 'react';
import styled from 'styled-components';

const Header = styled.div`{
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding : 30px 10px 15px;
}`;

class Peserta extends Component {

    render() {
        return (
            <React.Fragment>
                <Header>
                    <h4>Jadwal Test</h4>
                </Header>
            </React.Fragment>
        )
    }
}

export default Peserta
