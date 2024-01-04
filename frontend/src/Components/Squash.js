import "./info.css"

import React, { useState, useEffect } from 'react';
import UpdateTime from "./UpdateTime"


function getTime() {
  // Function to get the current time in "h:mm A" format

  //Get the time
  const now = new Date();
  //Round to the last hour 
  now.setMinutes(0)
  //Remove hour and minutes
  const hours = now.getHours();
  const minutes = now.getMinutes();
  //Get the PM or AM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  //Format (for military time)
  const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedTime;
}



const Squash = ({ onReset }) => {
  const [currentCapacity, setCurrentCapacity] = useState(null);
  const [data, setData] = useState([{}])
  const curMinutes = UpdateTime();
  useEffect(() => {
    fetch("/api/data").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        const currentTime = getTime();
        const capacityData = data.LOCATIONS["Squash"];

        setCurrentCapacity(capacityData[currentTime] || "Closed");
      }
    )
  }, [])
  return (
    <div class="info">

      <span class="bolded"> Squash Courts: </span>
      <span class="right" onClick={onReset}> x </span>
      <br></br>
      <span> Last updated: {curMinutes} minutes ago </span>
      <br></br>
      <br></br>
      <span class="bolded"> {currentCapacity === "Closed" ? (
        <div>Closed</div>
      ) : (
        <div>
        <div>{currentCapacity} out of 3</div>
        </div>
      )}
      </span>
      <br></br>
      <a target="_blank" href="https://recreation.columbia.edu/booking" class="underlined"> Reserve a spot</a>

    </div>
  );
};

export default Squash;