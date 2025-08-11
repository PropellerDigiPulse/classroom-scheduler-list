import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Classes from "./pages/Classes";
import Home from "./pages/Home";
import Login from './pages/Login';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/class/:roomId" element={<Classes/>}/>
      </Routes>
    </Router>
  )
}

export default App;