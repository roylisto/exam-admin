import React from 'react';
import styled from 'styled-components';

const Container = styled.div`{
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ffabab;
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 5vw;
    z-index: 2;
    padding: 0 2vw;
}`;

const LogoAdmin = styled.a`{
    display: flex;
    align-items: center;
    height : 30px;
    color: #000 !important;
    img {
        width : 100%;
    }
}`

const ImageWrapper = styled.div`{
    width: 30px;
    height: 30px;
    border-radius : 100px;
    overflow : hidden;
    margin-right: 15px;
}`

const NavbarDashboard = (props) => {
    return (
        <Container>
            <LogoAdmin>
                <ImageWrapper>
                    <img src="https://cdn.zeplin.io/5f281c5cde10f72079056c76/assets/d3e880b8-0e46-42e0-a243-4a073b3f9b86.png" alt=""/>
                </ImageWrapper>
                {props.username}
            </LogoAdmin>
        </Container>
    )
}

export default NavbarDashboard
