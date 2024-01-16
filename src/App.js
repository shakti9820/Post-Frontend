import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Secret from "./pages/Secret";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddSecretPost from "./pages/AddSecretPost";
import ShowSecretPost from "./pages/ShowSecretPost";
import Myposts from "./pages/Myposts";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Secret />} />
        <Route path="/add" element={<AddSecretPost/>} />
        <Route path="/show" element={<ShowSecretPost/>}/>
        <Route path="/mypost" element={<Myposts/>}/>
      </Routes>
    </BrowserRouter>
  );
}
