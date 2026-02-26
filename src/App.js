import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;


