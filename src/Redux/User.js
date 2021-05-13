export const updateUser = (user) => ({
    type: "updateUser",
    currentUser: user
})


const IS = {
    currentUser: null
}

const userReducer = (state = IS, action) => {
    switch(action.type){
        case "updateUser":
            return {...state, currentUser: action.currentUser};
        default: return state
    }
}

export default userReducer