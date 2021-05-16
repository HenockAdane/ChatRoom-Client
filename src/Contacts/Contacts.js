import React from 'react'
import styles from "../Contacts/Contacts.module.scss"
import {useDispatch, useSelector} from "react-redux"
import {FaUser} from "react-icons/fa"

import {viewProfile} from "../Redux/Contact"
import {showModal} from "../Redux/Modal"


function Contacts() {

    const dispatch = useDispatch()

    const contacts = useSelector(state => state.contactReducer.contacts)
    const a = useSelector(state => state.contactReducer.viewProfile)

    console.log(contacts[0])

    const openModal = (modalName) => dispatch(showModal(modalName))
    console.log({a})

    return (
        <div className={styles.Contacts}>

        <h1>Contacts</h1>

        <div className={styles.contacts}>
            {contacts.map(contact => <button type="button" className={styles.contact} onClick={() => dispatch(viewProfile(contact))}><FaUser/>
            <p>{contact}</p></button>)}
        </div>

        <button className={styles.openModal} onClick={() => openModal("newContact")}>New Contact</button>
        
            
        </div>
    )
}

export default Contacts
