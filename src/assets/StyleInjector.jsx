import { useEffect } from "react";

export const StyleInjector = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `

      @font-face {
        font-family: 'Merriweather'; /* We use the same name so you don't have to change any other code! */
        src: url('/Title.ttf') format('truetype');
        font-weight: 700; 
      }  
        
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      
      body {
        font-family: 'Inter', sans-serif; /* Default font */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};