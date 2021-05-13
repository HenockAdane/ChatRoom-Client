import React from 'react'
import { useSelector } from 'react-redux'
import styles from "../Settings/Settings.module.scss"

function Settings() {

    const currentUser = useSelector(state => state.userReducer.currentUser)

    const saveSettings = () => {
            
    }

    return (

        
        <div>


            <form onSubmit={saveSettings}>

                <input type="text" className={styles.userName} />
            </form>


            <p className={styles.userID}>{currentUser._id}</p>
            


        </div>
    )
}

export default Settings
