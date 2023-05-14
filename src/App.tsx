import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/navbar'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { About } from './pages/about'
import { Products } from './pages/products/products'
import { Blog } from './pages/blog'
import { Cart } from './pages/cart'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
