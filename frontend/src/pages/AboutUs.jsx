import { useState, useEffect } from "react";

function AboutUs() {
  const [isDiv1Hidden, setDiv1Hidden] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen w-screen flex flex-col md:flex-row">
      <div
        className={`bg-blue-200 flex-1 h-full w-full z-20 flex flex-col items-center justify-center transition-opacity duration-300 ${isMobile ? (isDiv1Hidden ? 'absolute opacity-0 pointer-events-none' : 'absolute') : 'relative opacity-100'}`}
      >
        <p>Div 1</p>
        {isMobile && (
          <button onClick={() => setDiv1Hidden(true)} className="mt-4 px-4 py-2 bg-white text-black rounded">
            Hide me
          </button>
        )}
      </div>
      <div
        className={`bg-red-200 flex-1 h-full z-20 flex flex-col items-center justify-center transition-opacity duration-300 ${isMobile ? (isDiv1Hidden ? 'absolute top-0 left-0 w-full h-full opacity-100' : 'opacity-0 pointer-events-none') : 'relative opacity-100'}`}
      >
        <p>Div 2</p>
        {isDiv1Hidden && (
          <button onClick={() => setDiv1Hidden(false)} className="mt-4 px-4 py-2 bg-white text-black rounded">
            Show Div 1
          </button>
        )}
      </div>
    </div>
  );
}

export default AboutUs;
