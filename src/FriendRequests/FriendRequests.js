import React from 'react'
import styles from "../FriendRequests/FriendRequests.module.scss"
import { ImCross } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import {FaUser} from "react-icons/fa"


function FriendRequests() {

    const requests = useSelector(state => state.friendRequestsReducer)
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const socket = useSelector(state => state.socketReducer)
    console.log(requests)

    const addFriend = (userName) => {

        socket.emit("addFriend", {currentUser: currentUser.userName, otherUser: userName})
    }

    const removeRequest = (userName) => {

        socket.emit("removeFriendRequest", {currentUser: currentUser.userName, otherUser: userName})
    }


    return (
        <div>
            <h1>Friend Requests</h1>

            {requests.map(request => request.isMyRequest ? <div>
                <div>
                    <p>{request.userName}</p>
                    <p>Outgoing Friend Request</p>
                </div>
                <button onClick={() => removeRequest(request.userName)}><ImCross /></button>
            </div> : <div>
            <div>
                <p>{request.userName}</p>
                <p>Incoming Friend Request</p>
            </div>
            <button onClick={() => removeRequest(request.userName)}><ImCross /></button>
            <button onClick={() => addFriend(request.userName)}><TiTick /></button>
        </div>)}
            
        </div>
    )
}

export default FriendRequests
