import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import './index.css';
import { Home } from './pages/Home';
import { PredictCarPrice } from './pages/PredictCarPrice';
import { Chats } from './pages/Chats';
import { ChatSeller } from './pages/ChatSeller';
import { MyAds } from './pages/MyAds';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/predict-car-price" element={<PredictCarPrice />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat-seller/:id" element={<ChatSeller />} />
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);