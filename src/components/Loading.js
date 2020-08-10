import styled from 'styled-components';

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
                <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
                <div className="spinner-grow text-primary" role="status"></div>
                <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
            </Container>
        )
    }
}

export default Loading

