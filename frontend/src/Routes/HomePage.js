import React, { useState } from 'react';
import mapImage from '../images/map.png';
import './dfc.css';
import Capacity from '../Components/Capacity'
import UpperMachine from '../Components/UpperMachine';
import Track from '../Components/Track';
import Stretch from '../Components/Stretch';
import FreeWeights from '../Components/FreeWeights';
import Squash from '../Components/Squash';
import LowerMachine from '../Components/LowerMachine';
import Pool from '../Components/Pool';
import BlueGym from '../Components/BlueGym';

const HomePage = () => {

  const [isShifted, setIsShifted] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleCapacityClick = (component) => {
    setSelectedComponent(component);
    setIsShifted(true);
  };

  const resetSlide = () => {
    setIsShifted(false);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Upper Machine':
        return <UpperMachine onReset={resetSlide}/>;
      case 'Track':
        return <Track onReset={resetSlide} />;
      case 'Stretch':
        return <Stretch onReset={resetSlide} />;
      case 'Free Weights':
        return <FreeWeights onReset={resetSlide} />;
      case 'Squash':
        return <Squash onReset={resetSlide} />;
      case 'Lower Machine':
        return <LowerMachine onReset={resetSlide} />;
      case 'Blue Gym':
        return <BlueGym onReset={resetSlide}/>;
      case 'Pool':
        return <Pool onReset={resetSlide}/>;
      default:
        return <div>Select a capacity unit</div>;
    }
  };

  return (
    <div>
      <div id="title">
        <span>Columbia Dodge Fitness Center Availability </span>
      </div>
      <div className='big-container'>
        <div className={`${isShifted ? 'slide' : 'center'}`}>
          <img src={mapImage} useMap='#floormap' alt="gym layout" width="750" height="550" />
          <Capacity location="Upper Machine"  onReset={resetSlide} onClick={() => handleCapacityClick("Upper Machine")}  />
          <Capacity location="Track" onReset={resetSlide} onClick={() => handleCapacityClick("Track")}  />
          <Capacity location="Stretch" onReset={resetSlide} onClick={() => handleCapacityClick("Stretch")}   />
          <Capacity location="Free Weights" onReset={resetSlide} onClick={() => handleCapacityClick("Free Weights")}   />
          <Capacity location="Squash" onReset={resetSlide} onClick={() => handleCapacityClick("Squash")}  />
          <Capacity location="Blue Gym" onReset={resetSlide} onClick={() => handleCapacityClick("Blue Gym")}  />
          <Capacity location="Lower Machine" onReset={resetSlide} onClick={() => handleCapacityClick("Lower Machine")}   />
          <Capacity location="Pool" onReset={resetSlide} onClick={() => handleCapacityClick("Pool")}   />
        </div>
        <div className={`info-box ${isShifted ? 'show' : ''}`}>
          {renderComponent()}
        </div>
      </div>

    </div>
  );
};

export default HomePage;