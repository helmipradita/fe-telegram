import './App.css';
import Login from './pages/Login';
import Chat from './components/Chat/ChatPage';
// import Home from "../src/pages/Chat";
import Home from '../src/pages/Home';
import Join from './pages/Join';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Edit from './pages/Edit';
function App() {
  const socket = socketIO.connect(process.env.REACT_APP_BACKEND_API_HOST);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/join" element={<Join socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
