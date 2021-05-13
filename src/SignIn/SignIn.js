import React, {useState} from 'react'
import styles from "../SignIn/SignIn.module.scss"
import {useDispatch} from "react-redux"
import {updateUser} from "../Redux/User"
import {Link} from "react-router-dom"

function SignIn() {

    const dispatch = useDispatch()

    const [state, setState] = useState(()=> ({
        userNameOrEmail: "ycrcjsgpyvnvxqtzrs@miucce.com",
        password: "ycrcjsgpyvnvxqtzrs@miucce.com",
        rememberMe: false
    }))

    const signIn = async (e) => {

        e.preventDefault()
        console.log(1)
        
        try{

            console.log(1)

            const response = await fetch(`${process.env.REACT_APP_API}/auth/signin`, {
                method: "POST",
                mode: "cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userNameOrEmail: state.userNameOrEmail, password: state.password})
            })
            console.log(1)


            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }


            const data = await response.json()

            console.log(data)


            if (data.user){
                dispatch(updateUser(data.user))

                if (state.rememberMe){
                    localStorage.setItem("globalChatUser", JSON.stringify(data.user._id))
                }
            }

            else{
                console.log(data.message)
            }



        } catch(error){
            console.log(error)
        }
    }


    const setInputValueToState = (e) => {
        const {value, name} = e.target
        console.log(value)

        if (name !== "rememberMe"){
            setState(ps => ({
                ...ps,
                [name]: value
            }))
        }

        else{
            console.log(3)
            setState(ps => ({
                ...ps,
                [name]: !ps[name]
            }))
        }
    }

    return (
        <div className={styles.SignIn}>

        <div className={styles.container}>
            <p style={styles.title}>Sign In</p>

            <form onSubmit={signIn}>
                <input type="text" name="userNameOrEmail" required onChange={setInputValueToState} value={state.userNameOrEmail} placeholder="UserName Or Email"/>
                <input type="password" name="password" required onChange={setInputValueToState} value={state.password} placeholder="Password"/>
                <div>
                    <input type="checkbox" name="rememberMe" onChange={setInputValueToState} checked={state.rememberMe} />
                <label for="rememberMe">Remember Me</label>
                </div>
                <input className={styles.submitInput} type="submit" value="Sign In" />
            </form>


            <Link to="/auth/signup">Create your amazon account</Link>
        </div>
            
        </div>
    )
}

export default SignIn
