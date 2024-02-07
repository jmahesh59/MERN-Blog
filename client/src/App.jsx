import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin'
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/project" element={<Projects/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
