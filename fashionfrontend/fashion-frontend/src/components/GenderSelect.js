import React from 'react'; 
import './GenderSelect.css';
 function GenderSelect({ setGender }) { 
    return (
    <div className="gender-select"> 
    <h1>Choose your style</h1> 
    
    <div className="buttons"> 
        <button className="women" onClick={() => 
        setGender('women')}>Women</button>
         <button className="men" onClick={() => 
         setGender('men')}>Men</button> 
         </div> 
         </div> 
         );
         } 
         export default GenderSelect;