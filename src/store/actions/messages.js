export default (message)=>{
    return {
        type: "NEW_MESSAGE",
        payload: message
    }
}