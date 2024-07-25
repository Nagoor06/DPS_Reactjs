import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './tailwind.css';
import backgroundImage from './assets/imgbg1.avif';
import logo from './assets/logo.jpg'; // Import your logo image

const theme = createTheme({
  transitions: {
    duration: {
      standard: 300,
    },
    easing: {
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

const WelcomePage = ({ onEnter }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="relative h-screen flex flex-col">
        
        
         
          
        

        {/* Background Image and Welcome Content */}
        <div
          className="flex-grow bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImage})`
            // Adjust this value based on the header height
          }}
        >
          <div className="flex items-center justify-center h-full">
          <img src={logo} alt="Logo" className="h-12 ma" style={{ position: 'absolute', top: '0.5cm', left: '0.5cm' }} />
          <div className="text-center text-white" >
              <h1 className="calligraphy-text text-6xl font-bold mb-4 '">Welcome to CRM Portal</h1>
              <div
                onClick={onEnter}
                className="relative inline-block px-8 py-4 text-lg font-semibold bg-sky-500  cursor-pointer rounded-tr-lg rounded-bl-lg transition-all duration-500 hover:rounded-none hover:scale-105"
              >
                <span className="relative z-10 text-white-600 text-bold">Enter</span>
                <span className="absolute top-0 left-0 w-2 h-2 border-t-4 border-l-4 border-black transition-all duration-500 hover:w-full hover:h-full"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-4 border-r-4 border-black transition-all duration-500 hover:w-full hover:h-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default WelcomePage;
