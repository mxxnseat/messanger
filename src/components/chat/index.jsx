import React from "react";
import { useSelector } from "react-redux";

export default ()=>{
    const user = useSelector(({login})=>login.user);

    return (
        <div>
            Hello, {user}.
        </div>
    )
}