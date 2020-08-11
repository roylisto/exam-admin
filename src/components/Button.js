import styled from 'styled-components';

const Button = styled.button`
  width : ${props => props.small ? "120px" : "170px"};
  height : ${props => props.small ? "35px" : "45px"};
  background-color: ${props => props.white ? "white" : "#f86060"};
  color: ${props => props.white ? "black" : "white"};
  border: ${props => props.white ? "1px solid #f86060" : "none"};
  border-radius: 50px;
  &:hover, &:active, &:focus {
    background-color: #f13f3f;
    color: white;
    border-radius: 50px;
    outline : none !important;
  }
`;

export default Button;
