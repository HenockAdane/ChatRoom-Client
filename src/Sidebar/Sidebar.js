import React, {useState} from 'react'
import Contacts from '../Contacts/Contacts'
import Conversations from '../Conversations/Conversations'
import styles from "../Sidebar/Sidebar.module.scss"
import {AiOutlineClose} from "react-icons/ai"
import {useSelector, useDispatch} from "react-redux"
import {updateUser} from "../Redux/User"
import NewContactModal from '../NewContactModal/NewContactModal'
import NewConversationModal from "../NewConversationModal/NewConversationModal"
import FriendRequests from '../FriendRequests/FriendRequests'


function Sidebar() {

    const dispatch = useDispatch()
    const newContactModalOpen = useSelector(state => state.modalReducer.newContact)
    const newConversationModalOpen = useSelector(state => state.modalReducer.newConversation)


    const [state, setState] = useState(()=> ({
        currentTab: "conversations",
        newConversationModalOpen: false
    }))


    const changeTab = (e) => {
        const {name} = e.target

        setState(ps => ({
            ...ps,
            currentTab: name 
        }))
    }

    const signOut = () => {

        dispatch(updateUser(null))
        localStorage.setItem("globalChatUser", JSON.stringify(null))

    }

    
    return (
        <div className={styles.Sidebar}>

        <nav>

            <input className={styles.tabOptions} type="button" onClick={signOut} value="Sign Out" />

            <input className={styles.tabOptions} style={state.currentTab === "conversations" ? {backgroundColor: "white", color: "grey"} : {backgroundColor: "#EFEFEF", color: "blue"}} type="button" name="conversations" onClick={changeTab} value="Conversations" />

            <input className={styles.tabOptions} style={state.currentTab === "contacts" ? {backgroundColor: "white", color: "grey"} : {backgroundColor: "#EFEFEF", color: "blue"}}  type="button" name="contacts" onClick={changeTab} value="Contacts" />

            <input className={styles.tabOptions} style={state.currentTab === "requests" ? {backgroundColor: "white", color: "grey"} : {backgroundColor: "#EFEFEF", color: "blue"}}  type="button" name="requests" onClick={changeTab} value="Requests" />
        </nav>

        {state.currentTab === "conversations" ? <Conversations /> : state.currentTab === "contacts" ? <Contacts /> : <FriendRequests />}
        
        {newConversationModalOpen ? <NewConversationModal /> : false}
        {newContactModalOpen ? <NewContactModal /> : false}

            
        </div>
    )
}

export default Sidebar
