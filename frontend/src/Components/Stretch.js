import "./info.css"
import History from  "../Components/history"
import UpdateTime from "./UpdateTime"



import React, { useState, useEffect } from 'react';


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

function CapacityMessage(currentCapacity) {
  if (currentCapacity === "Closed") {
    return null;
  }
  const parsed = parseInt(currentCapacity, 10);
  if (parsed >= 0 && parsed <= 25) {
    return "Estimated 8 mats available";
  }
  else if (parsed >= 26 && parsed <= 50) {
    return "Estimated 5 mats available";
  }
  else if (parsed >= 51 && parsed <= 75) {
    return "Estimated 2 mats available";
  }
  else if (parsed >= 76) {
    return "Estimated 1 mats available";
  }
}

const Stretch = ({ onReset}) => {
  const [currentCapacity, setCurrentCapacity] = useState(null);
  const [data, setData] = useState([{}])
  const capacityMessage = CapacityMessage(currentCapacity);
  const curMinutes = UpdateTime();

  useEffect(()=>{
    fetch("/api/data").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        const currentTime = getTime();
        const capacityData = data.LOCATIONS["Stretch"];
  
        setCurrentCapacity(capacityData[currentTime] || "Closed");
      }
    )
  }, [])
    return (
        <div class = "info">
        <span class = "bolded"> Stretch: </span>
        <span class = "right" onClick={onReset}> x </span>
        <br></br> 
        <span> Last updated: {curMinutes} minutes ago</span>
        <br></br>
        <br></br>
        <span class = "bolded"> {currentCapacity} </span>
        <br></br>
      {capacityMessage && (
        <div>
          <span className="bolded">{capacityMessage}</span>
          <br />
        </div>
      )}
      <br></br>
        <a href="https://recreation.columbia.edu/booking" target="_blank" class = "underlined"> Reserve cardio equipment </a>
        <br></br>
        <br></br>
         
        <span> Historical: </span>
        <br></br>
        <br></br>
        <History location="Stretch"/>
       </div>
    
    );
  };
  
  export default Stretch;