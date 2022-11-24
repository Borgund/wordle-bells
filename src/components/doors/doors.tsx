import {useState} from 'react';

import styles from './doors.module.scss';

let dateNow = new Date();

// TODO: Don't pretend it's the 4th of Dec by removing these 2 lines ...
dateNow.setMonth(11);
dateNow.setDate(4);

const nth = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

export const DoorContainer = (props: { children: any; }) => {

    const day = dateNow.getDate() + nth(dateNow.getDate());

    return (
        <>
            <h1>(Let's pretend that) Today is the {day} of December!</h1>
            <div className={styles.doorContainer}>
                {props.children}
            </div>
        </>
    )
}

export const Door = (props: { number: number; }) => {

    const {
        number
    } = props;

    const [open, setOpen] = useState(false);
    const [shake, setShake] = useState(false);

    const canOpen = () => {
        let doorDate = new Date(dateNow);
        doorDate.setMonth(11);
        doorDate.setDate(number);

        return dateNow >= doorDate;
    }

    const stopShake = () => {
        setTimeout(function () {
            setShake(false);
        }, 1000)
    }

    return (
        <div
            className={`${styles.backDoor} ${open ? styles.open : ""} ${shake ? styles.shake : ""}`}
            tabIndex={0}
            onClick={() => {
                if (canOpen()) {
                    setOpen(!open);
                } else {
                    setShake(true);
                    stopShake();
                }
            }}
        >
            <div className={`${styles.door}`}>
                <div className={styles.number}>{number}</div>
            </div>
        </div>
    )
}