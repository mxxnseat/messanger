import React from "react";
import { useSelector } from "react-redux";

import Form from "./components/form";
import Chat from "./components/chat";
import Error from "./components/error";

import "./scss/app.scss";


const App = () => {
    const authorizationCheck = useSelector(({ login }) => login.authorized);
    const errors = useSelector(({ errors }) => errors.errors);

    return (
        <React.Fragment>
            {
                errors.length ? 
                <div className="error">{
                    errors.map(error => <Error key={error.id} {...error} />)
                }</div> : ''
            }

            <div className="container container_full-height">
                <div className="wrapper">
                    {
                        authorizationCheck ? <Chat /> : <Form />
                    }

                </div>
            </div>
        </React.Fragment>
    )
}



export default App;