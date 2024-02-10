// pages/your-page.tsx

import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';


const YourPage: React.FC = () => {
  return (
    <div className="relative">
      {/* The animated background component will be full-screen */}
      <AnimatedBackground />

      {/* Your content here, which will overlay the animated background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome to the Hackathon</h1>
        {/* ... other content ... */}
      </div>
    </div>
  );
};

export default YourPage;
