import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {updateUser} from "../Redux/User"
import {updateRoom} from "../Redux/Room"
import {BsSearch, BsThreeDotsVertical, BsFillChatSquareDotsFill,  BsCircle} from "react-icons/bs"
import styles from "../Header/Header.module.scss"


function Header(props) {

    const socket = props.socket

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(() => ({
        toggleNavDisplay: "none",
        newChatMenuWidth: "0px",
        newRoomName: "",
        rooms: []
    }))

    useEffect(()=> {

        socket.emit("loadMessages", currentUser._id)
        socket.on("loadMessages", data => {
            console.log(data)
            setState(ps => ({
                ...ps,
                rooms: data
            }))
        })
    }, [])

    const toggleNavDisplay = () => {
        if (state.navDisplay === "none"){
            setState(ps => ({
                ...ps,
                navDisplay: "unset"
            }))
        }

        else{
            setState(ps => ({
                ...ps,
                navDisplay: "none"
            }))
        }
    }

    const toggleNewChatMenuWidth= () => {
        if (state.newChatMenuWidth === "0px"){
            setState(ps => ({
                ...ps,
                newChatMenuWidth: "100%"
            }))
        }

        else{
            setState(ps => ({
                ...ps,
                newChatMenuWidth: "0px"
            }))
        }
    }

    const signOut = () => {

        dispatch(updateUser(null))
        localStorage.setItem("globalChatUser", JSON.stringify(null))


    }        
    console.log(currentUser)

    const setInputValueToState = (e) => {

        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))

    }


    const createNewRoom = (e) => {
        e.preventDefault()

        socket.emit("createNewRoom", {userID: currentUser._id, roomName: state.newRoomName})       
    
    }

    

    return (
        <header className={styles.header}>
        <div className={styles.cont}>
                <BsCircle size="25" />
                <BsFillChatSquareDotsFill size="25" />
                <BsThreeDotsVertical size="25" onClick={toggleNavDisplay} />

                <nav style={{display: state.navDisplay}}>
                    <button className={styles.navButtons} onClick={toggleNewChatMenuWidth}>New Room</button>
                    <button className={styles.navButtons}>Create A Room</button>
                    <button className={styles.navButtons}>Profile</button>
                    <button className={styles.navButtons}>Archived</button>
                    <button className={styles.navButtons}>Starred</button>
                    <button className={styles.navButtons}>Settings</button>
                    <button className={styles.navButtons} onClick={signOut}>Log Out</button>
                </nav>

                <div className={styles.newChatMenu} style={{width: state.newChatMenuWidth}}>
                    <form onSubmit={createNewRoom}>
                        <input type="text" name="newRoomName" placeholder="New Room Name" value={state.newRoomName} onChange={setInputValueToState} />
                        
                        <input type="submit" value="Create New Room" />
                    </form>
                </div>
                <div className={styles.newGroupMenu}></div>
        </div>

        <div className={styles.cont2}>
            {state.rooms.map(room => <button onClick={()=> dispatch(updateRoom(room))}>
                <h1>{room.name}</h1>
                <p>{room.lastRecievedMessage}</p>
                </button>)}
        </div>
        </header>
    )
}

export default Header
