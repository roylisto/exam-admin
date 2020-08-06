import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

import React, { Component } from 'react'

class Loading extends Component {
    render() {
        return (
            <Container>
                <Spinner animation="grow" size="sm" variant="primary"/>
                <Spinner animation="grow" variant="primary"/>
                <Spinner animation="grow" size="sm" variant="primary"/>
            </Container>
        )
    }
}

export default Loading

