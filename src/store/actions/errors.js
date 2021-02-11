export const setError = ({id,text})=>{
    return {
        type: "SET_ERROR",
        payload: {
            id,
            text
        }
    }
}
export const deleteError = (id)=>{
    return {
        type: "DELETE_ERROR",
        payload: {
            id
        }
    }
}