import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import styles from "../Main/Main.module.scss"
import Sidebar from '../Sidebar/Sidebar';
import CurrentConversation from "../CurrentConversation/CurrentConversation"
import { useDispatch, useSelector } from 'react-redux';
import {updateConversation, setConversations, readMessage, messageRecieved, clearConversation} from "../Redux/Conversation"
import { setContacts, addContact } from "../Redux/Contact"
import {addRequest, setRequests, removeFriendRequest} from "../Redux/FriendRequests"
import {setSocket} from "../Redux/Socket"
import {currentConversation, createNewConversation} from '../Redux/Conversation'
import ReactAudioPlayer from 'react-audio-player';
import ContactInfo from "../ContactInfo/ContactInfo"




const ENDPOINT = "http://localhost:3001"


function Main() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const currentConversation = useSelector(state => state.conversationReducer.currentConversation)
    const conversations = useSelector(state => state.conversationReducer.conversations)
    const Ssocket = useSelector(state => state.socketReducer)
    const viewProfile = useSelector(state => state.contactReducer.viewProfile)

    const [state, setState] = useState(() => ({
        notification: false
    }))

    useEffect(()=> {

        const socket = io(ENDPOINT)
        console.log("main")
        socket.emit("addSocket", currentUser.userName)
        console.log(socket.id)

        dispatch(setContacts(currentUser.contacts))
        dispatch(setSocket(socket))
        dispatch(setRequests(currentUser.friendRequests))


        socket.on("newConversationCreated", newConversation => {
            dispatch(createNewConversation(newConversation))
        })

        //check if there are any unrecieved messages
        
    



        socket.emit("loadAccount", currentUser.chats)

        socket.emit("loadConversations", currentUser.userName)

        socket.on("loadConversations", conversations => {
            console.log({conversations})
            dispatch(setConversations(conversations))
        })

        socket.on("clearConversation", conversationID => {
            dispatch(clearConversation(conversationID))
        })

        

        socket.on("friendRequest", data => {
            const {error} = data

            if (error){
                alert("user does not exist")
            }

            else{
                dispatch(addRequest(data))
            }
            
        })

        socket.on("removeFriendRequest", userName => {
            dispatch(removeFriendRequest(userName))
        })

        socket.on("friendAdded", friend => {
            dispatch(addContact(friend))
            dispatch(removeFriendRequest(friend))
        })

        socket.on("messagesRead", data => {
            console.log(data)
            dispatch(readMessage(data))
        })

        socket.on("recieveMessage", data => {
            console.log(data)
            alert("h")

            if(data.sender !== currentUser.userName){

                setState(ps => ({
                    ...ps,
                    notification: false
                }))

               
                setState(ps => ({
                    ...ps,
                    notification: true
                }))
                

            }



            dispatch(updateConversation(data))

        })

        socket.on("messageRecieved", data => {
            console.log(data)
            dispatch(messageRecieved(data))
        })

        


        return () => {
            
            console.log("socket closed")
            dispatch(setSocket(null))
            socket.disconnect()

        }
        

    }, [])

    useEffect(()=> {
        const unrecieved = []
        console.log(conversations)
        if (Ssocket){
            conversations.forEach(convo => {
                const isTrue = convo.messages.some(message => message.sender !== currentUser.userName && message.recieved === false)
    
                console.log({bruh: isTrue})
    
                if (isTrue){
                    unrecieved.push(convo._id)
                }
            })
    
            console.log({unrecieved})
    
    
            if (unrecieved.length > 0){
                Ssocket.emit("messageRecieved", {conversationIDs: unrecieved, currentUser: currentUser.userName})
            }

            
        }

        

    },[conversations])
    return (
        <div className={styles.Main}>

            {state.notification ? <ReactAudioPlayer
                src="/bbm_notification.mp3"
                autoPlay={true}
                style={{display: "none"}}
                /> : false}

            <Sidebar />
            <CurrentConversation />
            {viewProfile ? <ContactInfo userName={viewProfile} /> : false}
        </div>
    )
}

export default Main
