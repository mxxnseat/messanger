import React, { useState } from "react";
import {Link} from "react-router-dom";
import cn from "classnames";


export default () => {
    const page = window.location.pathname.split("/")[1];
    const [activeLink, setActiveLink] = useState(page);
    
    const active = (link)=>{
        if(link.indexOf(activeLink) != -1) return cn("nav-bar__item active");
        return cn("nav-bar__item");
    }

    return (
        <nav className="nav-bar">
            <Link to="/login" className={active(['login', ''])} onClick={()=>setActiveLink("login")}>Авторизация</Link>
            <Link to="/register" className={active(["register"])} onClick={()=>setActiveLink("register")}>Регистрация</Link>
        </nav>
    )
}