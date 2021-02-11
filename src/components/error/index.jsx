import React from "react";
import { useDispatch } from "react-redux";

import { deleteError } from "../../store/actions/errors";

export default ({ id, text }) => {
    const dispatch = useDispatch();

    function deleting(){
        setTimeout(() => {
            setTimeout(() => dispatch(deleteError(id)), 600);

            const error = document.querySelectorAll(".error__item");
            error[id] && error[id].classList.add("hiding");

        }, 8000);
    }

    return (
        <div className="error__item alert alert-danger" onLoad={deleting()} role="alert">
            <p>{text}</p>
            
            <button type="button" onClick={()=>dispatch(deleteError(id))} className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};
