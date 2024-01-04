import React, { useState, useEffect } from 'react';


function getTime() {
  // Function to get the current time in "h:mm A" format

  //Get the time
  const now = new Date();
  //Remove hour and minutes
  const hours = now.getHours();
  const minutes = now.getMinutes();
  //Get the PM or AM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  //Format (for military time)
  const formattedTime = `${minutes.toString().padStart(2, '0')}`;
  

  return formattedTime;
}



const UpdateTime = () => {
    console.log(getTime())
    return getTime();

}

export default UpdateTime;