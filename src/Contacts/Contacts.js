import React from 'react'
import styles from "../Contacts/Contacts.module.scss"
import {useDispatch, useSelector} from "react-redux"
import {FaUser} from "react-icons/fa"


import {showModal} from "../Redux/Modal"


function Contacts() {

    const dispatch = useDispatch()

    const contacts = useSelector(state => state.contactReducer)

    console.log(contacts)

    const openModal = (modalName) => dispatch(showModal(modalName))

    return (
        <div className={styles.Contacts}>

        <h1>Contacts</h1>

        <div className={styles.contacts}>
            {contacts.map(contact => <div className={styles.contact}><FaUser/>
            <p>{contact}</p></div>)}
        </div>

        <button className={styles.openModal} onClick={() => openModal("newContact")}>New Contact</button>
        
            
        </div>
    )
}

export default Contacts
