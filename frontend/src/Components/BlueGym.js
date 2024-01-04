import "./info.css"
import History from "../Components/history"

import React, { useState, useEffect } from 'react';
// import data from "./data.json"
import "./Capacity.css"
import UpdateTime from "./UpdateTime";

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


const BlueGym = ({ onReset}) => {
  const [currentCapacity, setCurrentCapacity] = useState(null);
  const [data, setData] = useState([{}])
  const curMinutes = UpdateTime();
  useEffect(()=>{
    fetch("/api/data").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        const currentTime = getTime();
        const capacityData = data.LOCATIONS["Blue Gym"];

  
        setCurrentCapacity(capacityData[currentTime] || "Closed");
      }
    )
  }, [])
  
  return (
    <div class="info">
      <span class="bolded"> Blue Gym: </span>
      <span class="right" onClick={onReset} > x </span>
      <br></br>
      <span> Last updated: {curMinutes} minutes ago</span>
      <br></br>
      <br></br>
      <span class="bolded"> {currentCapacity} </span>
      <br></br>
      <br></br>
      <a className = "underlined" target="_blank" href="https://perec.columbia.edu/hours-operation"> View schedule</a>
      <br></br>
    </div>
  );
};

export default BlueGym;