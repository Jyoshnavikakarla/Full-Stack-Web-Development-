import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import Page4 from './Pages/Page4';
import Navbr from './Navbr';


const App = () => {
  return (
    <div>
      <Navbr />
      <Routes>
        <Route path="/firstpage" element={<Page1 />} />
        <Route path="/secondpage" element={<Page2 />} />
        <Route path="/thirdpage" element={<Page3 />} />
        <Route path="/fourthpage" element={<Page4 />} />
        <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}>Page Not Found</div>} />
      </Routes>
    </div>
  );
};


export default App;




