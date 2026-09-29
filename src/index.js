import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router';
import './index.css';
import App from './App';
import Blog from './component/Blog';
import BlogDetail from './component/Blog/BlogDetail';
import reportWebVitals from './reportWebVitals';
import Index from './component/Member/index';
import Update from './component/Account/update';
import MyProduct from './component/Product/MyProduct';
import AddProduct from './component/Product/AddProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace />} />
        <Route path="/blog" element={<App><Blog /></App>} />
        <Route path="/blog/detail/:id" element={<App><BlogDetail /></App>} />
        <Route path="/member/login-register" element={<Index />} />
        <Route path="/account/update" element={<App><Update /></App>} />
        <Route path="/account/product/list" element={<App><MyProduct /></App>} />
        <Route path="/account/product/add" element={<App><AddProduct /></App>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
