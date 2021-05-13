export const showModal = (modal) => ({
    type: "TOGGLEDISPLAY",
    modal
})

const modals = {
    newConversation: false,
    newContact: false
}

const modalReducer = (state = modals, action) => {
    switch(action.type){
        case "TOGGLEDISPLAY":
            return {...state, [action.modal]: !state[action.modal]};
        default: return state
    }
}

export default modalReducer