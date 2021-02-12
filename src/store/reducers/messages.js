const initialState = {
    messages: []
};

export default (state = initialState, {type, payload})=>{
    switch(type){
        case "NEW_MESSAGE": 
            return {
                ...state,
                messages: [...state.messages, payload]
            }

        default: return state;
    }
}