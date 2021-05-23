import './App.css';
import {useEffect} from "react"
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import {Switch, Redirect, Route} from "react-router-dom"
import { useSelector } from 'react-redux';
import {updateUser} from "./Redux/User"
import AccountConfirmation from './AccountConfirmation/AccountConfirmation';
import {useDispatch} from "react-redux"
import Main from './Main/Main';




function App() {

  const currentUser = useSelector(state => state.userReducer.currentUser)
  const dispatch = useDispatch()

  // socket.emit("check", {message: "hey"})
  // socket.on("checked", (data)=> {
  //   console.log(data)
  // })
  //check

  console.log(1)
const zs = "zs"
  useEffect(async ()=> {

    console.log(zs)
    console.log(118)

    const userID = JSON.parse(localStorage.getItem("globalChatUser"))
    console.log(userID)

    if (userID){
        try{

          const response = await fetch(`${process.env.REACT_APP_API}/auth/loadAccount`,{
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userID: userID})
          })
    
          if (response.status !== 200){
            throw new Error("could not load account")
          }
    
          const user = await response.json()
    
          dispatch(updateUser(user))
    
        } catch(error){
          console.log(error)
          localStorage.setItem("globalChatUser", JSON.stringify(null))
          
        }
    }    

  }, [dispatch])

  console.log(process.env.REACT_APP_API)

 

  console.log(currentUser)

  return (
    <div className="App">
      


        
        
        <Switch>
          <Route exact path="/" render={()=> 
            currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <Redirect to="/auth/signin"/>
          } />

          
          <Route exact path="/chat" render={() => 
          currentUser && currentUser.confirmed ? <Main /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <Redirect to="/" />} />



          <Route exact path="/auth/signin" render={() =>
            currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <SignIn />
          } />

          <Route exact path="/auth/signup" render={() =>
            currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <SignUp />
          } />

          <Route exact path="/auth/confirm-account" render={() => 
            currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <AccountConfirmation /> : <Redirect to="/auth/signin" />
          } />

        </Switch>
    </div>
  );
}

export default App;














// import './App.css';
// import {useEffect} from "react"
// import Home from './Home/Home';
// import SignIn from './SignIn/SignIn'
// import SignUp from './SignUp/SignUp'
// import ChatRoom from './ChatRoom/ChatRoom'
// import {Switch, Redirect, Route} from "react-router-dom"
// import { useSelector } from 'react-redux';
// import {updateUser} from "./Redux/User"
// import AccountConfirmation from './AccountConfirmation/AccountConfirmation';
// import {useDispatch} from "react-redux"
// import io from "socket.io-client"
// import Header from './Header/Header';
// import SlideMenu from './SlideMenu/SlideMenu';
// import All from './All';


// const ENDPOINT = "http://localhost:3001"
// const socket = io(ENDPOINT)

// function App() {

//   const currentUser = useSelector(state => state.userReducer.currentUser)
//   const dispatch = useDispatch()

//   socket.emit("check", {message: "hey"})
//   socket.on("checked", (data)=> {
//     console.log(data)
//   })

//   console.log(1)
// const zs = "zs"
//   useEffect(()=> {

//     console.log(zs)

//     const user = JSON.parse(localStorage.getItem("globalChatUser"))
//     console.log(user)

//     if (user){
//       dispatch(updateUser(user))
//     }

//     // socket.emit("check", ({a:"hey"}))


//     // if (cart && cart.length > 0){
//     //   dispatch(addLocalStorageCartAction(cart))
//     // }

    

//   }, [dispatch])

//   console.log(currentUser)

//   return (
//     <div className="App">
      


        
//         <Switch>
          // <Route exact path="/" render={()=> 
          //   currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <Home />
          // } />

          
          // <Route exact path="/chat" render={() => 
          // currentUser && currentUser.confirmed ? <All socket={socket} /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <Redirect to="/" />} />



          // <Route exact path="/auth/signin" render={() =>
          //   currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <SignIn />
          // } />

          // <Route exact path="/auth/signup" render={() =>
          //   currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <Redirect to="/auth/confirm-account" /> : <SignUp />
          // } />

          // <Route exact path="/auth/confirm-account" render={() => 
          //   currentUser && currentUser.confirmed ? <Redirect to="/chat" /> : currentUser ? <AccountConfirmation /> : <Redirect to="/auth/signin" />
          // } />
          
          // <Route exact path="/menu" render={() => 
          //  <SlideMenu />
          // } />



//         </Switch>
//     </div>
//   );
// }

// export default App;
