import React, { useState, useEffect } from 'react';
import "./Capacity.css"

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

const Capacity = ({ location, onClick }) => {

  const [currentCapacity, setCurrentCapacity] = useState(null);
  const [data, setData] = useState([{}])

  useEffect(() => {
    //Get the data from backend
    const fetchData = () => {

      fetch("/api/data").then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          const currentTime = getTime();
          const capacityData = data.LOCATIONS[location];

          setCurrentCapacity(capacityData[currentTime] || "Closed");
        }
      )
    }
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);


  }, []);
  const [hoveredItem, setHoveredItem] = useState(null);


  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleMouseClick = () => {
    onClick();
  };
  let parsed;
  if (currentCapacity === "Closed") {

    parsed = 100;
  }
  else if (currentCapacity && currentCapacity.includes("court")) {
    const temp = parseInt(currentCapacity, 10);

    parsed = temp / 3 * 100
  }
  else {
    parsed = parseInt(currentCapacity, 10);
    if (isNaN(parsed)) {
      parsed = 0;
    }
  }
  return (
    <div className="container-wrapper" id={location.replace(/[\/\s]/g, '')}>
      <div

        className={`${hoveredItem === location ? 'pop' : 'container'}`}
        onMouseEnter={() => handleMouseEnter(location)}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
      >
        {hoveredItem === location ? (
          <div className="hold">
          <div className="bar">
            <div className="fill" style={{ width: `${parsed}%` }}></div>
          </div>
          <div className="text">{currentCapacity}</div>
        </div>
          
        ) : (
          <div className="hold">
            <div className="bar">
              <div className="fill" style={{ width: `${parsed}%` }}></div>
            </div>
            <div className="text">
              {location}
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

export default Capacity;
