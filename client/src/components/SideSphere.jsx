import React from 'react';
import Sphere from "../img/globe (2).png"

const SphereComponent = () => {
  return (
    <div className='centeredContentLeft'> 
      <span> Study Sphere</span>
      <img src={Sphere} alt="Sphere"/> 
    </div>
  );
};

export default SphereComponent;