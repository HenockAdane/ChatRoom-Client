export const updateRoom = (room) => ({
    type: "UPDATEROOM",
    room
})

const IS = {
    currentRoom: {}
}

const roomReducer = (state = IS, action) => {
    switch(action.type){
        case "UPDATEROOM":
            return {...state, currentRoom: action.room};
        default: return state
    }
}

export default roomReducer