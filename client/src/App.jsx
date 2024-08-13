import {BrowserRouter,Routes,Route} from 'react-router-dom';
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
