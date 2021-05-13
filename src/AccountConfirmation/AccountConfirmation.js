import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {updateUser} from "../Redux/User"
import styles from "../AccountConfirmation/AccountConfirmation.module.scss"

function AccountConfirmation() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        confirmationCode: ""
    }))

    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const confirmAccount = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch(`${process.env.REACT_APP_API}/auth/confirm`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: currentUser._id,
                    attemptedCode: state.confirmationCode,
                    attemptedTime: new Date().getTime()
                })
            })

            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }

            const data = await response.json()

            if(data.user){
                dispatch(updateUser(data.user))
            }

            else{
                console.log(data.message)
            }
        } catch(error){
            console.log(error)
        }
    }

    const resendConfirmationCode = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch(`${process.env.REACT_APP_API}/auth/resend-confirmation-code`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: currentUser._id
                })
            })

            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }

            const data = await response.json()

                console.log(data.message)

        } catch(error){
            console.log(error)
        }
    }
    return (
        <div className={styles.AccountConfirmation}>

        <div className={styles.container}>
            <div className={styles.intro}>
                <p style={styles.title}>Confirm Account</p>
                <p>We have sent the confirmation code to {currentUser.email}</p>
            </div>

            <form onSubmit={confirmAccount}>
                <input type="text" name="confirmationCode" required onChange={setInputValueToState} value={state.confirmationCode} placeholder="Confirmation Code"/>
                <input className={styles.submitInput} type="submit" value="Confirm Account" />
            </form>

            <form onSubmit={resendConfirmationCode}>
                <input className={styles.submitInput} type="submit" value="Resend Code" />
            </form>
        </div>
            
        </div>
    )
}

export default AccountConfirmation