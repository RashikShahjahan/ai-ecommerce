import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800/90 border-b border-purple-500/20">
        <Link to="/" className="mr-4 text-purple-200 hover:text-purple-100">Home</Link>
        <Link to="/about" className="mr-4 text-purple-200 hover:text-purple-100">About</Link>
        <Link to="/orders" className="text-purple-200 hover:text-purple-100">Orders</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
