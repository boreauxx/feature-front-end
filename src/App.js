import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// PAGES
import Signup from './components/auth/Signup';
import Authenticate from './components/auth/Authenticate'
import Navigation from './components/home/Navigation'
import Home from './components/home/Home'
import Landing from './components/home/Landing'
import Calculator from './components/home/Calculator';
import Profile from './components/home/Profile'
import Program from './components/home/Program'

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Authenticate />} />
            <Route path='/home' element={<Home />} />
            <Route path='/calculator' element = {<Calculator/>}/>
            <Route path='/profile' element = {<Profile/>}/>
            <Route path='/program' element = {<Program/>}/>
            <Route path='/' element={<Landing />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}
 
export default App;