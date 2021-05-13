import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import styles from "../ChatRoom/ChatRoom.module.scss"


function ChatRoom(props) {

    const currentUser = useSelector(state => state.userReducer.currentUser)

    const currentRoom = useSelector(state => state.roomReducer.currentRoom)

    


    const [state, setState] = useState(()=> ({
        message: "",
        messages: [],
        isTyping: [],
        users: []
    }))

    const socket = props.socket


    const scroll = useRef(null)

    useEffect(()=> {

        socket.emit("isLoaded", null)

        socket.emit("userJoined", currentUser.userName)

        socket.on("userJoined", userName => {
            setState(ps => ({
                ...ps,
                users: [...ps.users, userName]
            }))
        })
        socket.on("loadMsgs", (data) => {
            console.log(data)
            setState(ps => ({
                ...ps,
                messages: data
            }))
        })

    }, [socket])



    const setInputValueToState = (e) => {
        const {value, name} = e.target
        console.log(value)

        if (value){
            socket.emit("isTyping", {status: true, user: currentUser.userName})
        }

        else{
            socket.emit("isTyping", {status: false, user:currentUser.userName})
        }

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    useEffect(() => {
        socket.on("addMessage", data => {
            setState(ps => ({
                ...ps,
                messages: [...ps.messages, data]
            }))
            console.log(scroll.current)

            scroll.current.scrollTo({
                top:scroll.current.scrollHeight,
                behavior: "smooth"
            })
        })

        socket.on("isTyping", data => {
            console.log(data)
            console.log(state.isTyping)

            if (data.status){
                //if the status of them typing is true

                //looks to see if that user is already in the isTyping array
                const exists = state.isTyping.find(user => user === data.user)

                //if user already exists do this
                if (exists){

                }


                //if user doesnt exist, then add them to the array
                else{
                    setState(ps => ({
                        ...ps,
                        isTyping: [...ps.isTyping, data.user]
                    }))
                }
            }

            else{

                //looks to see if that user is in the isTyping array
                const exists = state.isTyping.find(user => user === data.user)

                //if user is in the isTyping array, then remove them from it as their typing status is false meaning that they are not typing
                if (exists){
                    setState(ps => ({
                        ...ps,
                        isTyping: ps.isTyping.filter(user => user === exists)
                    }))

                }


            }
                // const exists = state.isTyping.find(user => user === data.user)
                // console.log(exists, 5)

                // if (exists){

                //     setState(ps => ({
                //         ...ps,
                //         isTyping: ps.isTyping.filter(user => user !== data.user)
                //     }))
                    
                // }

                // else{
                //     setState(ps => ({
                //         ...ps,
                //         isTyping: [...ps.isTyping, data.user]
                //     }))
                    
                // }
            
            

        })
    }, [socket, state.isTyping]);

    


    

    const sendMessage = async (e) => {
        e.preventDefault()
console.log(1)
        socket.emit("addMessage", {user: currentUser._id, message:state.message})
        console.log(2)

        
        
    }
  
    return (
        <div className={styles.ChatRoom}>
        <h1 style={{color: "red"}}>{state.users.length}</h1>
        {state.users.map(user => <h1 style={{color: "green"}}>{user}</h1>)}

            <div className={styles.messageContainer} ref={scroll}>

            <h1>{state.isTyping.length}</h1>
            {state.isTyping.length === 0 ? false : state.isTyping.length > 0 && state.isTyping.length <= 3 ? <p>{state.isTyping.join("")} are typing</p> : <p>Multiple people are typing</p>}



                {state.messages.map(message => <p className={message.user === currentUser._id ? styles.userMessages : styles.otherMessages}>{message.message}</p>)}
            </div>

            <form className={styles.utilsContainer} onSubmit={sendMessage}>
                <input type="text" name="message" placeholder="Type A Message" className={styles.messageBox} onChange={setInputValueToState} value={state.messageBox} />
                <input className={styles.sendBtn} type="submit" value="Send" />
            </form>
            
        </div>
    )
}

export default ChatRoom

    // useEffect(()=> {
    //     setState(ps => ({...ps, user: props.user}))
    // }, [])

    // let [lit] = useCollectionData(dataBase.collection("messages"))
    
    // useEffect(() => {
    //     dataBase.collection("messages").get().then(res => {
    //         let messageArr = res.docs.map(a => a.data())
    //         setState(ps => ({...ps, messages: messageArr}))
    //     })

    // }, [lit])


    // let messages = () => {

    //     // console.log(state.messages)
    //     if (state.user && state.messages){
    //       let sortedArr = state.messages.sort((a,b) => a.dateCreated - b.dateCreated)
    //       return sortedArr.map(a => a.id === state.user.uid ? (
          
    //       <li className="sent">
    //       <p className="message">{a.message}</p>
    //       <img src className="img" src={a.accountImg}/>
    //       </li>) : (
          
    //       <li className="received">
    //       <img src className="img" src={a.accountImg}/>
    //       <p className="message">{a.message}</p>
    //       </li>))
    //     }
    //   }



    // const inputChange = (e) => {
    //     const message = e.target.value;
    //     setState(ps => ({...ps, message: message}))
    //   }
    
    //   const sendMessage = () => {
    //     if(state.message){
    //       dataBase.collection("messages").add({
    //         id: state.user.uid,
    //         accountImg: state.user.photoURL,
    //         message: state.message,
    //         dateCreated: new Date()
    //       })
          
    
    //       setState(ps => ({...ps, message: ""}))
    //       // console.log(state.user.photoURL)
    
    //     }
    
    //   }
