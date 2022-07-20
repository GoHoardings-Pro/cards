
export const messageReducer = (state = {message:[]}, action) =>{
    switch (action.type) {
        case "MessageRequest":
            return{
                loading:true,
            }
        case "MessageSuccess":
            return{
                loading:false,
                message:action.payload
            }
        case "MessageFail":
            return{
                loading:false,
                message:"No data Found"
            }
        default:
            return state;
    }
}