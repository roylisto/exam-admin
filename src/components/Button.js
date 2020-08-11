import styled from 'styled-components';

const Button = styled.button`
  width : ${props => props.small ? "120px" : "180px"};
  height : ${props => props.small ? "35px" : "45px"};
  border-radius: 50px;
  background-color: #f86060;
  color: #fff;
  border: none;
  &:hover, &:active, &:focus {
    background-color: #f13f3f;
    color: #fff;
    border-radius: 50px;
    outline : none !important;
  }
`;

export default Button;
