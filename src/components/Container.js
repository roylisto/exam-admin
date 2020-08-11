import styled from 'styled-components';

const Container = styled.div`{
    font-family: 'Poppins';
    padding : 50px 0 50px ${props => props.span ? "50px" : "200px"};
}`;

export default Container;
