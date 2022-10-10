import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Todo from './pages/todo';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/todo" element={<Todo />}/>
    </Routes>
  );
}

export default App;
