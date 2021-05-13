import Conversations from "../Conversations/Conversations"

export const setConversations = (conversations) => ({
    type: "SETCONVERSATIONS",
    conversations
})

export const createNewConversation = (conversation) => ({
    type: "CREATENEWCONVERSATION",
    conversation
})

export const currentConversation = (conversationID) => ({
    type: "CURRENTCONVERSATION",
    conversationID
})


export const updateConversation = (data) => ({
    type: "UPDATECONVERSATION",
    data
})

export const readMessage = (data) => ({
    type: "READMESSAGES",
    data
})

export const messageRecieved = (data) => ({
    type:"MESSAGESRECIEVED",
    data
})

const setCurrentConversationFunction = (conversations, conversationID) => {
    const currentConversation = conversations.find(conversation => conversation._id === conversationID)

    return currentConversation
}


// const updateOtherConversationFunction = (conversations, data) => {
//     const {message, senderID, time, conversationID} = data


//     const updatedConversations = conversations.map(conversation => conversation._id === conversationID ? {...conversation, messages: [...conversation.messages, {message: message, sender: senderID, time: time}]} : conversation)

//     return updatedConversations
// }

// const updateCurrentConversation = (currentConversation, data) => {
//     const {message, senderID, time, conversationID} = data

//     if (currentConversation && currentConversation._id === conversationID){
//         return {...currentConversation, messages: [...currentConversation.messages, {message: message, sender: senderID, time: time}]}
//     }

//     else{
//         return currentConversation
//     }

// }

const updateConversations = (conversations, currentConversation, data) => {
    const {conversationID, sender, message, time, read, recieved} = data
    console.log({data})

    //check if the conversation is the currentConversation
    if (currentConversation && currentConversation._id === conversationID){

        const updatedCurrentConversation = {...currentConversation, messages: [...currentConversation.messages, {message: message, sender: sender, time: time, read: read, recieved: recieved, lastRecievedMessage: {message: message, time: time}}]}

        const updatedConversations = conversations.map(conversation => conversation._id === conversationID ? {...conversation, lastRecievedMessage: {message: message, time: time}, messages: [...conversation.messages, {message: message, sender: sender, time: time, read: read,recieved:recieved}]} : conversation)

        return {conversations: updatedConversations, currentConversation: updatedCurrentConversation}
        
    }

    else{
        const updatedConversations = conversations.map(conversation => conversation._id === conversationID ? {...conversation, lastRecievedMessage: message,messages: [...conversation.messages, {message: message, sender: sender, time: time, read: read,recieved: recieved}]} : conversation)

        return {conversations: updatedConversations, currentConversation: currentConversation}
    }

}

const readMessages = (conversations,data) => {
        const {conversationID, user} = data
        console.log(data)
        console.log("readmessagesssssssssssssssss")

        const conversation = conversations.find(convo => convo._id === conversationID)

        const readMessages = conversation.messages.map(message => message.sender !== user && message.read === false ? {...message, read:true }: message)

        const v1 = conversations.map(convo => convo === conversation ? {...conversation, messages: readMessages}: convo)

        console.log({v1})
        return {conversations: v1, currentConversation: {...conversation, messages: readMessages}}
}

const messagesRecieved = (conversations, currentConversation, data) => {
    const {conversationID, user} = data

    alert("this function has run")

    console.log("%receiveddddd","color: red; font-size: 45px;")


    if (currentConversation._id === conversationID){
        const selectedConvo = conversations.find(convo => convo._id === conversationID)

        selectedConvo.messages = selectedConvo.messages.map(message => message.sender !== user && message.recieved === false ? {...message, recieved: true} : message)

        return {conversations:conversations.map(convo => convo._id === conversationID ? selectedConvo : convo), currentConversation: selectedConvo}

    }

    else{
        const selectedConvo = conversations.find(convo => convo._id === conversationID)

        selectedConvo.messages = selectedConvo.messages.map(message => message.sender !== user && message.recieved === false ? {...message, recieved: true} : message)

        return conversations.map(convo => convo._id === conversationID ? selectedConvo : convo)
    }
}



const IS = {
    conversations: [],
    currentConversation: null,
}



const conversationReducer = (state = IS, action) => {
    switch(action.type){
        case "SETCONVERSATIONS":
            return {...state, conversations: [...action.conversations]};
        case "CREATENEWCONVERSATION":
            return {...state, conversations: [...state.conversations, action.conversation]};
        case "CURRENTCONVERSATION":
            return {...state, currentConversation: setCurrentConversationFunction(state.conversations, action.conversationID)};
        case "UPDATECONVERSATION":
            return updateConversations(state.conversations, state.currentConversation, action.data);
        case "READMESSAGES":
            return readMessages(state.conversations, action.data);
        case "MESSAGESRECIEVED":
            return messagesRecieved(state.conversations, state.currentConversation, action.data)
        default: return state
    }
}

export default conversationReducer