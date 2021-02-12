import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "./components/form";
import Chat from "./components/chat";
import Error from "./components/error";

import "./scss/app.scss";


const App = () => {
    const errors = useSelector(({ errors }) => errors.errors);
    const userData = useSelector(({login}) => login);


    return (
        <React.Fragment>
            {
                errors.length ? 
                <div className="error">{
                    errors.map(error => <Error key={error.id} {...error} />)
                }</div> : ''
            }

            <div className="container container_full-height">
                    {
                        userData.user ? <Chat /> : <Form />
                    }
            </div>
        </React.Fragment>
    )
}



export default App;