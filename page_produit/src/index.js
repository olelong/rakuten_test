import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="product/13060247469" />} />{" "}
        {/* J'ajoute cette ligne pour accéder par défaut à la fiche produit correspondante.*/}
        <Route path="product/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
