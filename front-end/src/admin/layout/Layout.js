import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Layout.css'
import axios from 'axios'

const Layout = (props) => {

    const [openMenuClick, setOpenMenuClick] = useState(false)
    const nav = useNavigate()
    const [loadingLogout, setLoadingLogout] = useState(false)

    const logout = async () => {
        localStorage.removeItem('userSportsClubsManagement')
        localStorage.removeItem('tokenSportsClubsManagement')
        nav('/')
    }

    return (
        <div className="containerDahboard">
            <div className="aside">
                <div className="brand">Aqua<span>Smart</span></div>
                <div className="linksSide">
                    <Link className={props.dashboard} to="/admin/dashboard"><i className="fa-solid fa-house-chimney"></i> Dashboard</Link>
                    {/* <Link className={props.users} to="/admin/users"><i className="fa-solid fa-users"></i> Users</Link> */}
                    <Link className={props.activities} to="/admin/activities"><i class="fa-solid fa-flag"></i> Activities</Link>
                    <Link className={props.userActivities} to="/admin/userActivities"><i class="fa-brands fa-product-hunt"></i> User Activities</Link>
                    <Link className={props.consomationParMois} to="/admin/ConsomationParMois"><i class="fa-solid fa-flag"></i> Consomation Par Mois</Link>
                    <Link className={props.Bonus} to="/admin/Bonus"><i class="fa-solid fa-layer-group"></i> Bonus</Link>
                </div>
            </div>
            <div className="main">
                <nav>
                    <div className="header">{props.header}</div>
                    <div onClick={() => setOpenMenuClick(!openMenuClick)} className="logout">
                        <i class="fa-regular fa-user"></i>
                    </div>
                </nav>
                {
                    openMenuClick &&
                    <div className="menuClick">
                        <Link onClick={logout}><i className="fa-solid fa-power-off"></i> Logout</Link>
                    </div>
                }
                <div className="content">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

export default Layout
