import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// ASSETS
import logout from '../assets/images/logout.png';
import home from '../assets/images/home.png';
import people from '../assets/images/people.png';
import pluspeople from '../assets/images/pluspeople.svg';
import calendar from '../assets/images/calendar.png';
// Utils
import { clearLocalStorage } from "../modules/utils"

const Container = styled.div`{
    width : ${props => props.minimize ? "0" : "200px"};
    height : 100vh;
    background-color: #f86060;
    z-index: 10;
    position : fixed;
    left: 0;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    padding: 15px 0;
    transition: all 0.5s;
    label {
        padding: 40px 15px 5px;
    }
    * {
        display : ${props => props.minimize ? "none" : "inline-block"};
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

const SidebarNew = (props) => {
    const [showpeserta, setShowPeserta] = useState(false);

    const handleShowPeserta = () => {
        setShowPeserta(prevShow => !prevShow);
    }
    return (
        <Container minimize={props.minimize}>
            <div className="d-flex justify-content-between">
                <Logo>Bakatku.id</Logo>
            </div>
            <label>
                <Image src={home} />
                Home
            </label>
            <NavLink
                to="/dashboard/jadwaltest"
                activeClassName="sidebar-menu-link-active"
                className={`sidebar-menu-link
                            ${(window.location.hash === "#/dashboard/peserta") ? "dropdown" : ""}`}
                isActive={(match, location) => {
                    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/jadwaltest") {
                        return true
                    }
                }}
                onClick={handleShowPeserta}
            >
                <Image src={calendar} />
                Jadwal Test
            </NavLink>
            <NavLink
                to="/dashboard/peserta"
                activeClassName="sidebar-menu-link-active"
                className={`sidebar-menu-link sub-menu`}
            >
                <Image src={people}/>
                Peserta
            </NavLink>
            {
                (props.role === "superadmin") ?
                <NavLink
                    to="/dashboard/useradmin"
                    activeClassName="sidebar-menu-link-active"
                    className="sidebar-menu-link"
                >
                    <Image src={pluspeople}/>
                    Add User Admin
                </NavLink> : ""
            }
            <NavLink
                to="/"
                className="sidebar-menu-link"
                onClick={()=>clearLocalStorage()}
            >
                <Image src={logout} />
                Log Out
            </NavLink>
        </Container>
    )
}

export default SidebarNew
