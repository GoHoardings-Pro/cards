import axios from "axios";

export const getMessage = (id) => async(dispatch)=>{
    try{
        dispatch({type: "MessageRequest"});

        const config = { headers : { "Content-Type" : "application/json"}};

        const { data } = await axios.post(`http://localhost:3001/listtoggle`, {id}, config)

        dispatch({ type: "MessageSuccess", payload: data});

    }catch(error){
        dispatch({type: "MessageFail", payload: error.response.data })
    }
} 