export const addContact = (contact) => ({
    type: "ADDCONTACT",
    contact
})


export const setContacts = (contacts) => ({
    type: "SETCONTACTS",
    contacts
})


const contacts = []

const contactReducer = (state = contacts, action) => {
    switch(action.type){
        case "SETCONTACTS":
            return action.contacts
        case "ADDCONTACT":
            return [...state, action.contact];
        default: return state
    }
}

export default contactReducer