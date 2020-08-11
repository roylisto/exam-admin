import React from 'react';
import styled from 'styled-components';
// ASSETS
import logout from '../assets/images/logout.png';
import home from '../assets/images/home.png';
import people from '../assets/images/people.png';
import calendar from '../assets/images/calendar.png';

const Container = styled.div`{
    height : 100vh;
    width : ${props => props.span ? "50px" : "200px"};
    background-color: #f86060;
    z-index: 10;
    position : fixed;
    left: 0;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    padding: 15px 0;
    label {
        padding: 40px 15px 5px;
    }
}`

const SidebarMenu = styled.a`{
    width: 100%;
    cursor: pointer;
    padding: 5px 15px;
    display: block;
    color: #fff;
    margin-top: 20px;
    &.active, 
    &:hover {
        color: #443c3c !important;
        background-color: #f6f9fc;
    }
    &.sub-menu {
        padding-left: 35px;
        margin-top: 0;
    }
}`

const Logo = styled.h5`{
    font-family: 'Roboto';
    padding-left: 5px;
    padding-right: 5px;
}`

const Image = styled.img`{
    width: 20px;
    margin-right: 10px;
    filter : ${props => props.hover ? "brightness(200%)" : "none"};
}`

const Sidebar = (props) => {
    return (
        <Container>
            <div className="d-flex justify-content-between">
                <Logo>Bakatku.id</Logo>
            </div>
            <label>
                <Image src={home} />
                Home
            </label>
            <SidebarMenu 
                className={`${(props.show === "jadwalTest" || "peserta") ? "active" : ""}`}
                onClick={()=>props.handleSwitchView("jadwalTest")}
                >
                <Image src={calendar} />
                Jadwal Test 
            </SidebarMenu>
            <SidebarMenu 
                className={`sub-menu ${(props.show === "peserta") ? "active" : ""}`}
                onClick={()=>props.handleSwitchView("peserta")}
                >
                <Image src={people} hover={(props.show !== "peserta")}/>
                Peserta 
            </SidebarMenu>
            <SidebarMenu 
                href="/" 
                onClick={()=>localStorage.removeItem("token")}>
                <Image src={logout} />
                Log Out 
            </SidebarMenu>
        </Container>
    )
}

export default Sidebar
