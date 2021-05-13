import React, {useState} from 'react'
import styles from "../SignUp/SignUp.module.scss"
import {useDispatch} from "react-redux"
import {updateUser} from "../Redux/User"
import {Link} from "react-router-dom"

function SignUp() {

    const dispatch = useDispatch()

    const [state, setState] = useState(()=> ({
        userName: "",
        email: "",
        password: ""
    }))

    const signUp = async (e) => {
        e.preventDefault()

        console.log(process.env.REACT_APP_API)

        try{
            console.log("hey")



            const response = await fetch(`${process.env.REACT_APP_API}/auth/signup`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userName: state.userName, email: state.email, password: state.password})
            })

            console.log("hey")


            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }

            console.log("hey")



            const data = await response.json()
            console.log(data)


            if (data.user){
                dispatch(updateUser(data.user))
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

        setState(ps => ({
            ...ps,
            [name]: value
        }))
        
    }

    return (
        <div className={styles.SignUp}>

        <div className={styles.container}>
            <p style={styles.title}>Sign Up</p>

            <form onSubmit={signUp}>
                <input type="text" name="userName" required onChange={setInputValueToState} value={state.userName} placeholder="UserName Or Email"/>
                <input type="email" name="email" required onChange={setInputValueToState} value={state.Email} placeholder="Email"/>
                <input type="password" name="password" required onChange={setInputValueToState} value={state.password} placeholder="Password"/>
                <input className={styles.submitInput} type="submit" value="Sign Up" />
            </form>


            <Link to="/auth/signin">Already Have An Account? Sign In</Link>
        </div>
            
        </div>
    )
}

export default SignUp
