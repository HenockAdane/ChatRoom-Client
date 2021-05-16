import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import styles from "../ContactInfo/ContactInfo.module.scss"
import {HiBan} from "react-icons/hi"
import {FaThumbsDown} from "react-icons/fa"
import {ImBin2} from "react-icons/im"


function ContactInfo(props) {

    const currentUser = useSelector(state => state.userReducer.currentUser)
    const socket = useSelector(state => state.socketReducer)

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
        
    },[props.userName])

    const removeFriend = () => {
        socket.emit("removeContact", {
            currentUser: currentUser.userName,
            otherUser: props.userName
        })
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

                <button type="button" className={styles.btns} onClick={removeFriend}><HiBan/><p>Block</p></button>
                <button type="button" className={styles.btns}><FaThumbsDown/><p>Report Contact</p></button>
                <button type="button" className={styles.btns}><ImBin2 /><p>Delete chat</p></button>

            </div>
            
        </div> : false
    )
}

export default ContactInfo
