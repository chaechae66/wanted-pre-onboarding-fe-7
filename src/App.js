import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signUp';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>
  );
}

export default App;
