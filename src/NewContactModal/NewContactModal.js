import React, { useState } from 'react'
import styles from "../NewContactModal/NewContactModal.module.scss"
import {showModal} from "../Redux/Modal"
import {useDispatch, useSelector} from "react-redux"
import {AiOutlineClose} from "react-icons/ai"
// import {addContact} from "../Redux/Contact"


function NewContactModal() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const requests = useSelector(state => state.friendRequestsReducer)
    const socket = useSelector(state => state.socketReducer)

    const [state, setState] = useState(() => ({
        userID: "",
        userName: ""
    }))


    const closeModal = (modalName) => dispatch(showModal(modalName))


    const setInputValueToState = (e) => {
        const {value, name} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    
    }

    const createNewContact = async (e) => {
        e.preventDefault()
        console.log(33)
        const otherUser = state.userName
        console.log(otherUser)

        //check if a request between the currentUser and the otherUser exist
        const request = requests.find(request => request.userName === otherUser)

        console.log(requests)
        console.log(request)

        if (request){ 
            //check if that request has already been sent by the currentUser
            if (request.isMyRequest){
                console.log("you have already sent a friend request to this user")
            }

            else{
                socket.emit("addFriend", {currentUser: currentUser.userName, otherUser: otherUser})
            }
        }

        //send a request if there are no requests atm
        else{
            socket.emit("addFriend", {currentUser: currentUser.userName, otherUser: otherUser})
        }

        

        // try{

        //     const response = await fetch(`${process.env.REACT_APP_API}/contact/add`, {
        //         method: "POST",
        //         mode: "cors",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify({currentUser: currentUser.userName, otherUser: state.userName})
        //     })

        //     if (response.status !== 200){
        //         throw new Error("response is not 200")
        //     }

        //     const data = await response.json()

        //     if (data.message){
        //         console.log(data.message)
        //     }

        //     else{
        //         dispatch(addContact({id: state.id, userName: state.userName}))
        //     }

            
        //     closeModal("newContact")

        // } catch(error){
        //     console.log(error)

        // }

        
    }





    return (
        <div className={styles.NewContactModal}>
            <form onSubmit={createNewContact}>
                <div className={styles.header}>
                    <h1>Create Contact</h1>
                    <button onClick={() => closeModal("newContact")}><AiOutlineClose /></button>
                </div>

                <div>
                    <p>Name</p>
                    <input type="text" placeholder="Enter User Name" name="userName" onChange={setInputValueToState} value={state.userName} />

                    <input className={styles.createBtn} type="submit" value="Create" />

                </div>



             </form>
        </div>
    )
}

export default NewContactModal
