import {BrowserRouter,Routes,Route} from 'react-router-dom';
<<<<<<< HEAD
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
}
=======
import home from './pages/home';
import about from './pages/about';
import profile from './pages/profile';
import signin from './pages/signin';
import signup from './pages/signup';



export default function App() {
  return<BrowserRouter>
  <Routes>
    <Route path="/" element={<home/>}/>
    <Route path="/sign_in" element={<signin/>}/>
    <Route path="/sign_up" element={<signup/>}/>
    <Route path="/about" element={<about/>}/>
    <Route path="/profile" element={<profile/>}/>




  </Routes>
  </BrowserRouter>
}
>>>>>>> 14e5a9ed63abf104d43b006d12781eef749a22d0
