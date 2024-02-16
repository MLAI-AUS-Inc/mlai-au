'use client'
import React, { useEffect, useRef, useState } from 'react';

export default function ZoomSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const handleScroll = () => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      const passedStart = scrollPosition - sectionTop;
      const scrollRatio = passedStart / sectionHeight;

      if (scrollRatio >= 0 && scrollRatio <= 1) {
        setScale(1 + scrollRatio);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="h-screen flex justify-center items-center relative overflow-hidden">
      <div className="sticky top-0 h-screen flex justify-center items-center">
        <div className="transition-transform duration-500" style={{ transform: `scale(${scale})` }}>
          <div className="text-4xl text-center">Welcome to the MLAI Green Battery Hack</div>
          <img src="your-image-source" alt="Zoom Image" className="max-w-full" />
        </div>
      </div>
    </div>
  );
};


