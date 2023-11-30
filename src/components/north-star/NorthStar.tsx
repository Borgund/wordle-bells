import star from "../../assets/north-star.svg";
import pentagram from "../../assets/pentagram.svg";
import styles from "./NorthStar.module.scss";
import { client } from "../../pocketbase";
import { useEffect, useState } from "react";

export const NorthStar = () => {

  async function isSatanMode() {

    var lastJesusAttempt = "";
    var lastSatanAttempt = "";
  
    const satan = await client.collection('attempts').getFirstListItem('attempt="SATAN"', {
      sort: '-created',
    }).then((e) => {
      lastSatanAttempt = e.created;
    }).catch((e) => {
      console.log(e);
    });
  
    const jesus = await client.collection('attempts').getFirstListItem('attempt="JESUS"', {
      sort: '-created',
    }).then((e) => {
      lastJesusAttempt = e.created;
    }).catch((e) => {
      console.log(e);
    });
    console.log("ATTEMPTS")
    console.log(lastJesusAttempt);
    console.log(lastSatanAttempt);
  
  
    // Apply satan mode
    if (lastJesusAttempt === "" && lastSatanAttempt !== "") {
      setSatanMode(true)
    } else if (lastJesusAttempt !== "" && lastSatanAttempt === "") {
      setSatanMode(false)
    } else {
      // Both are defined
      var jesusDate = new Date(lastJesusAttempt);
      var satanDate = new Date(lastSatanAttempt);
  
      if (satanDate > jesusDate) {
        setSatanMode(true)
      } else {
        setSatanMode(false)
      }
    }
  }

  const [satanMode, setSatanMode] = useState(false)

  useEffect(() => {  
    isSatanMode()
    client.collection('attempts').subscribe('*', isSatanMode);

  }, []);

  if (satanMode) {
    console.log("Applying satan mode")
    // @ts-ignore
    document.body.style = `
    --color-x-mas-blue-sky: var(--color-red-dark);
    filter: blur(2px) contrast(7);
    transform: scale(0.9) rotate(5deg);

    `
  } else {
    console.log("Applying jesus mode")
    // @ts-ignore
    document.body.style = ""
  }

  return (
    <img className={styles.star} src={satanMode ? pentagram : star} alt="yellow shaped star"></img>
  );
};
