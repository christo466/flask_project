
import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Dash from './pages/Dash'; 
import About from './pages/About'; 
import Dashboard from './pages/Data';
import Shope from './pages/Shope';
import Form from './pages/Shope/Form';

function App() {
    const [data, setData] = useState([
        { id: 1, name: 'John', age: 30, city: 'New York' },
        { id: 2, name: 'Jane', age: 25, city: 'San Francisco' },
        { id: 3, name: 'Mike', age: 35, city: 'Chicago' },
        { id: 4, name: 'Anna', age: 28, city: 'Los Angeles' },
        { id: 5, name: 'Tom', age: 32, city: 'Seattle' }
      ]);

      const [displayedData, setDisplayedData] = useState(data.slice(0, 3));
      const [remainingData, setRemainingData] = useState(data.slice(3));
    
     
      const handleArrow = () => {
        if (remainingData.length > 0) {
          setDisplayedData(prevData => [...prevData, remainingData[0]]);
          setRemainingData(prevData => prevData.slice(1));
        }
      };





  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/dash" element={<Dash data={displayedData}   handleArrow={handleArrow} 
        hasMore={remainingData.length > 0}  setData={setData} />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shope" element={<Shope />} />
        <Route path="/Form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
