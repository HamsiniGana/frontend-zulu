import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import LoadingPage from './components/LoadingPage';
import DataPage from './components/Datapage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComparePlants from './components/ComparePlants';
import DataLandingPage from './components/DataLandingPage';
import PlantInfo from "./components/PlantInfoPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/loadingPage' element={<LoadingPage/>}/>
        <Route path='/homepage' element={<Homepage />}/>
        <Route path='/homepage/data/irrigation-guide' element={<DataPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
        <Route path='/homepage/data' element={<DataLandingPage/>}/>
        <Route path='/homepage/data/compare-plants' element={<ComparePlants/>}/>
        <Route path='/homepage/data/plant-info' element={<PlantInfo/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;


