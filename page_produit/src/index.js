import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";
import ProductDetail from "./pages/ProductDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="product/7758205598" />} /> {/* J'ajoute cette ligne pour accéder directement à la fiche produit correspondante, mais dans un site complet, elle devrait être retirée. */}
        <Route path="product/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
