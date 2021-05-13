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
    const socket = useSelector(state => state.socketReducer)


    const unread = currentConversation?.messages.find(msg => msg.read === false)
    useEffect(() => {
        
        if(socket){
            console.log({currentConversation})
            
            console.log({unread})
            if (unread){
                socket.emit("messagesRead", {user: currentUser.userName, conversationID: currentConversation._id})
            }
        }

        console.log(currentConversation)

        console.log("rerendered")
    }, [unread])

  

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
            time: `${new Date().getMonth()}/${new Date().getDay()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            read: false
        })

    }

    console.log(currentConversation)




    return (
        <div className={styles.CurrentConversation}>
            {currentConversation ? <h1 style={{border: "1px solid"}}><p><FaUser />{currentConversation.users.find(user => user !== currentUser)}</p></h1> : false}

            <div className={styles.messages}>
                {currentConversation ? currentConversation.messages.map(message =>  message.sender === currentUser.userName ? 
                    <div className={styles.myMessage} >
                        <p>{message.message}</p>
                        {message.read ? <span><TiTick style={{color: "green"}}/>
                            <TiTick style={{color: "green"}}/></span> : message.recieved ? <span><TiTick />
                            <TiTick /></span> :<span><TiTick /></span>}
                    </div> : 
                    <div className={styles.otherMessage}>
                        <p>{message.message}</p>                        
                    </div>
                ) : false}
            </div>
            <form onSubmit={sendMessage}>
                <input type="text" className={styles.messageInput} placeholder="Type A Message" name="message" value={state.message} onChange={setInputValueToState} />
                <input type="submit" className={styles.sendBtn} value="Send" />
            </form>
        </div>
    )
}

export default CurrentConversation
