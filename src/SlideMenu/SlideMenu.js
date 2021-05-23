import React, {useState} from 'react'
import {BsSearch, BsThreeDotsVertical, BsFillChatSquareDotsFill,  BsCircle} from "react-icons/bs"
import styles from "../SlideMenu/SlideMenu.module.scss"

function SlideMenu() {

    const [state, setState] = useState(() => ({
        toggleDisplay: true,
        navDisplay: "none"
    }))

    // const toggleDisplay = () => {
    //     setState(ps => ({
    //         ...ps,
    //         toggleDisplay: !ps.toggleDisplay
    //     }))
    // }

    const toggleNavDisplay = () => {
        if (state.navDisplay === "none"){
            setState(ps => ({
                ...ps,
                navDisplay: "unset"
            }))
        }

        else{
            setState(ps => ({
                ...ps,
                navDisplay: "none"
            }))
        }
    }
    return (
        <div className={styles.container}>

        <header className={styles.header}>
            <BsCircle size="25" />
            <BsFillChatSquareDotsFill size="25" />
            <BsThreeDotsVertical size="25" onClick={toggleNavDisplay} />

            <nav style={{display: state.navDisplay}}>
                <button className={styles.navButtons}>New Room</button>
                <button className={styles.navButtons}>Create A Room</button>
                <button className={styles.navButtons}>Profile</button>
                <button className={styles.navButtons}>Archived</button>
                <button className={styles.navButtons}>Starred</button>
                <button className={styles.navButtons}>Settings</button>
                <button className={styles.navButtons}>Log Out</button>
            </nav>
        </header>

        <div className={styles.searchContainer}>
            <BsSearch />
            <input type="text" placeholder="Search or start a new chat" />
        </div>

        <div className={styles.roomsContainer}>
            <li className={styles.rooms}></li>
            <li className={styles.rooms}></li>
            <li className={styles.rooms}></li>
            <li className={styles.rooms}></li>
            <li className={styles.rooms}></li>
            <li className={styles.rooms}></li>
        </div>




            
        </div>
    )
}

export default SlideMenu
// {<div style={state.toggleDisplay ? {width: "375px"} : {width: "0px"}} className={styles.SlideMenu}>
// </div>
//     <div className={styles.toggleMenu} onClick={toggleDisplay}>
//         <div className={styles.menuBars}></div>
//         <div className={styles.menuBars}></div>
//         <div className={styles.menuBars}></div>
//     </div>}
