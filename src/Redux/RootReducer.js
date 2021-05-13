import {combineReducers} from "redux"
import userReducer from "./User"
import roomReducer from "./Room"
import modalReducer from "./Modal"
import contactReducer from "./Contact"
import friendRequestsReducer from "./FriendRequests"
import conversationReducer from "./Conversation"
import socketReducer from "./Socket"

const RootReducer = combineReducers({
    userReducer,
    roomReducer,
    modalReducer,
    contactReducer,
    friendRequestsReducer,
    conversationReducer,
    socketReducer
})

export default RootReducer