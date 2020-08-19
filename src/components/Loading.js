import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = (props) => {
    return (
        <Container>
            <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
            <div className="spinner-grow text-primary" role="status"></div>
            <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
        </Container>
    )
}

export default Loading

