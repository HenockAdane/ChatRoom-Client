import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import styles from "../ContactInfo/ContactInfo.module.scss"
import {HiBan} from "react-icons/hi"
import {FaThumbsDown} from "react-icons/fa"
import {ImBin2, ImCross} from "react-icons/im"
import { viewProfile } from '../Redux/Contact'


function ContactInfo(props) {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.userReducer.currentUser)
    const socket = useSelector(state => state.socketReducer)
    const conversations = useSelector(state => state.conversationReducer.conversations)
    const isContact = useSelector(state => state.contactReducer.contacts).find(user => user === props.userName)
    const isBlocked = useSelector(state => state.contactReducer.blocked).find(user => user === props.userName)



    const [state, setState] = useState(() => ({
        contact: null
    }))

    const apiCall = async () => {
        console.log(12344)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/contact/getContactProfile/${props.userName}`)

            if (response.status !== 200){
                throw new Error("status is not equal to 200")
            }

            const data = await response.json()

            setState(ps => ({
                ...ps,
                contact: data
            }))
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {

        apiCall()
        
    },[props.userName, apiCall])

    const removeFriend = () => {
        socket.emit("removeContact", {
            currentUser: currentUser.userName,
            otherUser: props.userName
        })
    }

    const blockContact = () => {
        socket.emit("blockContact", {
            currentUser: currentUser.userName,
            otherUser: props.userName
        })
    }

    const unblockUser = () => {
        socket.emit("unblockUser", {
            currentUser: currentUser.userName,
            otherUser: props.userName
        })
    }

    const clearConversation = () => {
        console.log(conversations[0].users)
        console.log(props.userName)
        console.log(currentUser.userName)
        const conversationID = conversations.find(convo => convo.users.includes(props.userName))._id
        console.log(conversationID)

        socket.emit("clearConversation", {
            userName: currentUser.userName,
            conversationID: conversationID
        })
    }

    const closeModal = () => {
        dispatch(viewProfile(null))
    }
    return (
        state.contact ? <div className={styles.ContactInfo}>

            <h1>Contact Info</h1>

            <div className={styles.intro}>
                <div className={styles.profilePic}></div>

                <p>{state.contact.userName}</p>
                
            </div>

            <div className={styles.utils}>
                
                <p>{state.contact.status}</p>
                <button onClick={closeModal}>CLOSE</button>

                {isBlocked ? <div>
                    <button type="button" className={styles.btns} onClick={unblockUser}><HiBan/><p>Unblock User</p></button>
                    <button type="button" className={styles.btns} onClick={clearConversation}><ImBin2 /><p>Delete chat</p></button>
                </div> : <div>
                    {isContact ? <button type="button" className={styles.btns} onClick={removeFriend}><ImCross/><p>Remove Friend</p></button> : false}
                    <button type="button" className={styles.btns} onClick={blockContact}><HiBan/><p>Block Friend</p></button>
                    <button type="button" className={styles.btns}><FaThumbsDown/><p>Report Contact</p></button>
                    <button type="button" className={styles.btns} onClick={clearConversation}><ImBin2 /><p>Delete chat</p></button>
            </div>}
                

            </div>
            
        </div> : false
    )
}

export default ContactInfo
