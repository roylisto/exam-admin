import styled from 'styled-components';

const ButtonIcon = styled.button`
  width : "50px";
  height : "35px";
  background-color: ${props => props.white ? "white" : "#f86060"};
  color: ${props => props.white ? "black" : "white"};
  border: ${props => props.white ? "1px solid #f86060" : "none"};
  border-radius: 50px;
  transition : all .2s ease;
  margin: 2px;
  &:hover, &:active, &:focus {
    transform: translateY(-2px);
    color: ${props => props.white ? "black" : "white"};
    border-radius: 50px;
    outline : none !important;
  }
  img {
    width : ${props => props.xs ? "16px" : "20px"};
  }
  &:disabled {
    opacity : 0.5;
  }
`;

export default ButtonIcon;