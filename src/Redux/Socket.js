export const setSocket = (socket) => ({
    type: "SETSOCKET",
    socket
})


const socket = null

const socketReducer = (state = socket, action) => {
    switch(action.type){
        case "SETSOCKET":
            return action.socket;
        default: return state
    }
}

export default socketReducer
