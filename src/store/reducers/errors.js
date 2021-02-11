const initialState = {
    errors: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_ERROR":

            return {
                ...state,
                errors: [...state.errors, {id:payload.id, text:payload.text}]
            }
        case "DELETE_ERROR":
            return {
                ...state,
                errors: state.errors.filter(error=>error.id!=payload.id)
            }
        default: return state;
    }
}