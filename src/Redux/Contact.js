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

export const removeContact = (userName) => ({
    type: "REMOVECONTACT",
    userName
})

export const setBlocked = (users) => ({
    type: "SETBLOCKED",
    users
})

export const blockContact = (userName) => ({
    type: "BLOCKCONTACT",
    userName
})

export const unblockUser = (userName) => ({
    type: "UNBLOCKUSER",
    userName
})



// const removeContacts = (state) => {
//     const {contacts} = state

//         return {contacts: contacts.filter(contact => contact !== action.userName), viewProfile: null}

// }

const IS = {
    contacts: [],
    blocked: [],
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
        case "REMOVECONTACT":
            return {...state, contacts: state.contacts.filter(contact => contact !== action.userName), viewProfile: null}
        case "SETBLOCKED":
            return {...state, blocked: action.users}
        case "BLOCKCONTACT":
            return {contacts: state.contacts.filter(contact => contact !== action.userName), blocked: [...state.blocked, action.userName], viewProfile: null}
        case "UNBLOCKUSER":
            return {...state, blocked: state.blocked.filter(user => user !== action.userName), viewProfile: null}
        default: return state
    }
}

export default contactReducer