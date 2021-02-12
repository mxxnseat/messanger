import React from "react";
import { useSelector } from "react-redux";

import "../../scss/chat/index.scss";

import Form from "./form";

export default ()=>{
    const messages = useSelector(({messages})=>messages.messages);

    return (
        <div className="chat">
            <div className="messages">
                {
                    messages.map(message=>{
                        return(
                            <div className="messages__item">
                                <div className="messages__author">{message.user}: </div>
                                <div className="message">{message.message}</div>
                            </div>
                        ) 
                    })
                }
                
            </div><Form />
        </div>
    )
}