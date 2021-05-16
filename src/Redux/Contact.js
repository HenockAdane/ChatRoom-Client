export const addContact = (contact) => ({
    type: "ADDCONTACT",
    contact
})


export const setContacts = (contacts) => ({
    type: "SETCONTACTS",
    contacts
})

export const viewProfile = (userName) => ({
    type: "VIEWPROFILE",
    userName
})

const IS = {
    contacts: [],
    viewProfile: null
}

const contactReducer = (state = IS, action) => {
    switch(action.type){
        case "SETCONTACTS":
            return {...state, contacts: action.contacts}
        case "ADDCONTACT":
            return {...state, contacts: [...state.contacts, action.contact]};
        case "VIEWPROFILE":
            return {...state, viewProfile: action.userName};
        default: return state
    }
}

export default contactReducer