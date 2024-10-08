import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PrivateRoute from './pages/components/PrivateRoute.jsx';
import CreateListing from './pages/CreateListing.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/about" element={<About />}/>
        <Route element={<PrivateRoute />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-listing" element={<CreateListing />}/>


      </Routes>
    </BrowserRouter>
  )
}
