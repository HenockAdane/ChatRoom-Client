import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import styles from "../CurrentConversation/CurrentConversation.module.scss"
import {FaUser} from "react-icons/fa"
import {TiTick} from "react-icons/ti"




function CurrentConversation() {

    const [state, setState] = useState(()=> ({
        message: "",
    }))

    const currentConversation = useSelector(state => state.conversationReducer.currentConversation)
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const contacts = useSelector(state => state.contactReducer.contacts)
    const socket = useSelector(state => state.socketReducer)

    


    const unread = currentConversation?.messages.find(msg => msg.read === false)
    console.log({unread})

    useEffect(() => {
        
        if(socket){
            console.log({currentConversation})
             
            
            if (unread){
                socket.emit("messagesRead", {user: currentUser.userName, conversationID: currentConversation._id})
            }
        }

        console.log(currentConversation)

        console.log("rerendered")
    }, [unread, socket, currentUser.userName, currentConversation ])

  

    const setInputValueToState = (e) => {
        const {value, name} = e.target
        console.log(value)

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const sendMessage = (e) => {
        e.preventDefault()

        socket.emit("sendMessage", {
            sender: currentUser.userName,
            conversationID: currentConversation._id ,
            message: state.message,            
            time: `${new Date().getMonth()}/${new Date().getDay()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`,
            read: false
        })

        setState(ps => ({
            ...ps,
            message: ""
        }))

    }

    

    console.log(currentConversation)
    
    let isContact = null
    
    if (currentConversation){
        const otherUser = currentConversation.users.find(user => user !== currentUser.userName)
        isContact = contacts.find(contact => contact === otherUser)
    }

    // const deleteMsg = () => {
        
    // }



    return (
        <div className={styles.CurrentConversation}>
            {currentConversation ? <h1 style={{border: "1px solid"}}><p><FaUser />{currentConversation.users.find(user => user !== currentUser.userName)}</p></h1> : false}

            <div className={styles.messages}>
                {currentConversation ? currentConversation.messages.map(message =>  message.sender === currentUser.userName ? 
                    <div className={styles.myMessage} >
                        <p>{message.message}</p>
                        {message.read ? <span><TiTick style={{color: "green"}}/>
                            <TiTick style={{color: "green"}}/></span> : message.recieved ? <span><TiTick />
                            <TiTick /></span> :<span><TiTick /></span>}
                            <div className={styles.options}>
                                <button>Delete</button>
                            </div>
                    </div> : 
                    <div className={styles.otherMessage}>
                        <p>{message.message}</p>
                        <div className={styles.options}>
                            <button>Delete</button>
                        </div>                        
                    </div>
                ) : false}
            </div>
            {isContact ? <form onSubmit={sendMessage}>
                <input type="text" className={styles.messageInput} placeholder="Type A Message" name="message" value={state.message} onChange={setInputValueToState} />
                <input type="submit" className={styles.sendBtn} value="Send" />
            </form> : currentConversation ? <form><input type="text" className={styles.messageInput} placeholder="You can not send to or recieve messages from this person as you are not friends" name="message" disabled="true" style={{padding: "10px 0"}} /></form>: false}
        </div>
    )
}



export default CurrentConversation
