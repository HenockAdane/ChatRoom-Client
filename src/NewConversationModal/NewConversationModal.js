import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "../NewConversationModal/NewConversationModal.module.scss"
import {AiOutlineClose} from "react-icons/ai"
import {showModal} from "../Redux/Modal"


function NewConversationModal() {

    const socket = useSelector(state => state.socketReducer)

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.userReducer.currentUser)
    const contacts = useSelector(state => state.contactReducer.contacts)


    const [state, setState] = useState(() => ({
        contacts: [currentUser.userName]
    }))


    const toggleModal = (modalName) => dispatch(showModal(modalName))
    const toggleMultipleModals = (modalName1, modalName2) => {
        dispatch(showModal(modalName1))
        dispatch(showModal(modalName2))
    }


    const setInputValueToState = (e) => {
        const {value, name} = e.target

        console.log(value)
        const exists = state.contacts.find(contact => value === contact)

        if (exists){
            const filteredContacts = state.contacts.filter(contact => contact !== value)
            setState(ps => ({
                ...ps,
                contacts: filteredContacts
            }))
        }

        else{
            setState(ps => ({
                ...ps,
                contacts: [...ps.contacts, value]
            }))
        }
    
    }

    console.log(state.contacts)

    const createNewConversation = (e) => {
        e.preventDefault()
        console.log("newconolon")
        if(state.contacts.length > 1 ){
            socket.emit("newConversation", state.contacts)
        }

        toggleModal("newConversation")
    }

    return (
        <div className={styles.NewConversationModal}>

            <form onSubmit={createNewConversation}>
                <div className={styles.header}>
                    <h1>Create Conversation</h1>
                    <button onClick={() => toggleModal("newCoversation")}><AiOutlineClose /></button>
                </div>


                <div>

                    {contacts.map(contact => 
                        <div className={styles.contactContainer}>
                            <input type="checkbox" value={contact} onClick={setInputValueToState} />
                            <p>{contact}</p>
                        </div>
                    )}
                    

                    {contacts.length > 0 && state.contacts.length > 1 ? <input className={styles.createBtn} type="submit" value="Create" /> : contacts.length > 0 ? false : <input className={styles.createBtn} type="button" value="Add Contact" onClick={()=> toggleMultipleModals("newConversation", "newContact")}/> }

                </div>

            </form>
            
        </div>
    )
}

export default NewConversationModal
