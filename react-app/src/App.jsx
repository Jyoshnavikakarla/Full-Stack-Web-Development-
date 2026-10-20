import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [buttonCount, setButtonCount] = useState(0);

  const hasCountedPage = useRef(false); // prevents double page count

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // Load and update counters once
  useEffect(() => {
    if (!hasCountedPage.current) {
      // Update page load count
      const storedPageCount = parseInt(localStorage.getItem('pageCount') || '0', 10) + 1;
      localStorage.setItem('pageCount', storedPageCount);
      setPageCount(storedPageCount);

      // Load button count
      const storedButtonCount = parseInt(localStorage.getItem('buttonCount') || '0', 10);
      setButtonCount(storedButtonCount);

      hasCountedPage.current = true; // prevent rerun
    }
  }, []);

  const handleButtonClick = () => {
    const newButtonCount = buttonCount + 1;
    localStorage.setItem('buttonCount', newButtonCount);
    setButtonCount(newButtonCount);
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Page & Button Counter</h1>
      <p>📄 Page loaded: {pageCount} time{pageCount !== 1 && 's'}</p>
      <p>🖱️ Button clicked: {buttonCount} time{buttonCount !== 1 && 's'}</p>
      <button onClick={handleButtonClick}>Click Me</button>
    </div>
  );
}

export default App;
