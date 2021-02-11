const initialState = {
    authorized: false,
    user: null
};

export default (state=initialState, {type, payload})=>{
    switch(type){
        case 'LOGIN':
            return {
                ...state,
                authorized: true,
                user: payload
            }
        case 'LOGOUT':
            return {
                ...state,
                authorized: false,
                user: null
            }

        default: return state;
    }
}