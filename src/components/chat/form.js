import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newMessage from "../../store/actions/messages";

import {io} from "socket.io-client";

const socket = io();

export default () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const user = useSelector(({login})=>login.user);
    useEffect(()=>{
        socket.on("newMessage",(message)=>dispatch(newMessage(message)));
    }, []);

    const textareaHandler = (e)=>{
        const value = e.target.value;
        setMessage(value);
    }
    const send = (e)=>{
        e.preventDefault();
        socket.emit("msg", {user, message});
        setMessage('');
    }

    return (
        <form className="chat__form" onSubmit={send}>
            <textarea onChange={textareaHandler} value={message} className="chat__textarea" />
            <button className="chat__send">Отправить</button>
        </form>
    )
}