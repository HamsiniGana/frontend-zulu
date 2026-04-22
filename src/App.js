import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import LoadingPage from "./components/LoadingPage";
import DataPage from "./components/Datapage";
import "bootstrap/dist/css/bootstrap.min.css";
import ComparePlants from "./components/ComparePlants";
import DataLandingPage from "./components/DataLandingPage";
import PlantInfo from "./components/PlantInfoPage";
import SearchPlant from "./components/SearchPlant";
import TradeReport from "./components/TradeReport";
import SoilTypes from "./components/SoilTypes";
import TradeGraph from "./components/TradeGraph";
import UserData from "./components/UserDashboard";
import RedditSignUpPage from "./components/RedditSignUpPage";
import RedditLoginPage from "./components/RedditLoginPage";
import RedditHomepage from "./components/RedditHompage";
import SearchPosts from "./components/SearchPosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loadingPage" element={<LoadingPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/homepage/data/irrigation-guide" element={<DataPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/homepage/data" element={<DataLandingPage />} />
        <Route
          path="/homepage/data/compare-plants"
          element={<ComparePlants />}
        />
        <Route path="/homepage/data/plant-info" element={<PlantInfo />} />
        <Route path="/homepage/data/search-plant" element={<SearchPlant />} />
        <Route path="/homepage/trade-report" element={<TradeReport />} />
        <Route path="/homepage/graphs" element={<TradeGraph />} />
        <Route path="/homepage/data/soil-types" element={<SoilTypes />} />
        <Route path="/user" element={<UserData />} />
        <Route path="/homepage/reddit-sign-up" element={<RedditSignUpPage />} />
        <Route path="/homepage/reddit-login" element={<RedditLoginPage />} />
        <Route path="/homepage/reddit-homepage" element={<RedditHomepage />} />
        <Route path="/homepage/reddit-homepage/search-posts" element={<SearchPosts />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
