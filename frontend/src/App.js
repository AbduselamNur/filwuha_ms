import React from "react";
import "./assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/Contact";
import Book from "./components/pages/Book";
import NotFound from "./components/pages/NotFound";
import Payment from "./components/pages/Payment";
import AdminLogin from "./components/pages/AdminLogin";
import AdminPage from "./components/pages/AdminPage";
import Receipt from "./components/pages/Receipt";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book" element={<Book />} />
          <Route path="payment" element={<Payment />} />
          <Route path="receipt" element={<Receipt />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />}>
          <Route path="home" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
