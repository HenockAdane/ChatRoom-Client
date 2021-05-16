import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {showModal} from "../Redux/Modal"
import styles from "../Conversations/Conversations.module.scss"
import {currentConversation} from '../Redux/Conversation'
import {FaUser} from "react-icons/fa"

function Conversations() {

    const dispatch = useDispatch()

    const conversations = useSelector(state => state.conversationReducer.conversations)
    const currentUser = useSelector(state => state.userReducer.currentUser)
    // console.log(conversations)

    const openModal = (modalName) => dispatch(showModal(modalName))

    // const a = if (conversations.users === 2){

    // }

    const sortedConversations = conversations.sort((convo1, convo2) => {
        return new Date(convo2.lastRecievedMessage.time) - new Date(convo1.lastRecievedMessage.time)
    })

    // convo.messages.filter(message => message.read === false).length



    return (
        <div className={styles.Conversations}>

        <h1>Conversations</h1>

        {sortedConversations.map(convo => <button className={styles.convo} onClick={() => dispatch(currentConversation(convo._id))}><FaUser /><div className={styles.subDiv}>{convo.messages.filter(message => message.sender !== currentUser.userName && message.read === false).length > 0 ? <div><p3>{convo.messages.filter(message => message.sender !== currentUser.userName && message.read === false).length}</p3></div> : false}<p1>{convo.users.find(userName => userName !== currentUser.userName)}</p1><p2>{convo.lastRecievedMessage.message}</p2></div></button>)}


        <button className={styles.openModal} onClick={() => openModal("newConversation")}>New Conversation</button>

        

            
        </div>
    )
}

export default Conversations
