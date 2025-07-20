import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // if using React Router


const Start = ({isloggedin}) => {
      const navigate = useNavigate();
      console.log(isloggedin)
       useEffect(() => {
    const timer = setTimeout(() => {
      isloggedin ? navigate('/home') : navigate('/login'); 
    }, 3200);

    return () => clearTimeout(timer); 
  }, [navigate]);
  return (
   <div className="w-full h-screen bg-yellow-500 flex items-center justify-center">
  <h1 className="text-white text-4xl font-bold animate-fade-in">
  {'SkillSwap'.split('').map((char, i) => (
    <span key={i}>{char}</span>
  ))}
</h1>

</div>



  )
}

export default Start
