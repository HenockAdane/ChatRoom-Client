import React from 'react'
import styles from "../Blocked/Blocked.module.scss"
import {useDispatch, useSelector} from "react-redux"
import {FaUser} from "react-icons/fa"

import {viewProfile} from "../Redux/Contact"


function Blocked() {

    const dispatch = useDispatch()
    const blocked = useSelector(state => state.contactReducer.blocked)


    return (
        <div className={styles.Blocked}>

            <h1>Blocked</h1>

            <div className={styles.users}>
                {blocked.map(user => <button type="button" className={styles.user} onClick={() => dispatch(viewProfile(user))}><FaUser/>
                <p>{user}</p></button>)}
            </div>
            
            
        </div>
    )
}

export default Blocked
