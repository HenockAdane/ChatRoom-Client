export const addRequest = (request) => ({
    type: "ADDREQUEST",
    request
})


export const setRequests = (requests) => ({
    type: "SETREQUESTS",
    requests
})

export const removeFriendRequest = (userName) => ({
    type: "REMOVEFRIENDREQUEST",
    userName
})


const friendRequests = []

const friendRequestsReducer = (state = friendRequests, action) => {
    switch(action.type){
        case "SETREQUESTS":
            return action.requests
        case "ADDREQUEST":
            return [...state, action.request];
        case "REMOVEFRIENDREQUEST":
            return state.filter(request => request.userName !== action.userName)
        default: return state
    }
}

export default friendRequestsReducer