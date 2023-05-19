import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/navbar';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { About } from './pages/about';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Order } from './pages/order/order';
import { OrderSubmit } from './pages/order/orderSubmit';
import { BlogPost } from './pages/blog/blogPost';
import { BlogPage } from './pages/blog/blogPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderSubmit" element={<OrderSubmit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;