import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Rating,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { API_PRODUCT_BASE_URL } from "../config";
import "../styles/ProductDetailsInfos.css";

function PriceBox({ oldPrice, price, label, isBestPrice }) {
  return (
    price > 0 && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Gestion des cas de promotions et de l'affichage des prix */}
        {oldPrice && oldPrice > 0 ? (
          <>
            <Typography variant="h5" fontWeight="bold">
              {price} €
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="light"
              sx={{ textDecorationLine: "line-through" }}
            >
              {oldPrice} €
            </Typography>
          </>
        ) : (
          <Typography variant="h5" fontWeight="bold">
            {price} €
          </Typography>
        )}

        <Typography variant="subtitle1">{label}</Typography>
        {isBestPrice && (
          <LocalFireDepartmentIcon color="error" fontSize="large" />
        )}
      </Box>
    )
  );
}

function ProductDetailsInfos() {
  const { productId } = useParams(); // Permet de récupérer l'ID présent dans l'URL.
  const [productInfos, setProductInfos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const oldPrice = parseFloat(productInfos?.data?.priceList) || 0;
  const newPrice = parseFloat(productInfos?.data.newBestPrice) || 0;
  const usedPrice = parseFloat(productInfos?.data.usedBestPrice) || 0;
  const isNewCheaper = newPrice <= usedPrice;

  console.log("HERE:", productId, newPrice);

  // Requête fetch pour récupérer les détails du produit.
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetch(`${API_PRODUCT_BASE_URL}${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProductInfos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [productId]);

  console.log(productInfos);

  if (loading) {
    return (
      <Box className="box-center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="box-center">
        <Typography>Erreur : {error}</Typography>
      </Box>
    );
  }
  console.log("desc:", productInfos.data.googleRichCards.description);

  return (
    <div className="product-detail-page">
      {/* Fiche Produit */}
      <Container maxWidth="lg" className="product-infos-container">
        <Box className="product-image">
          {/* Image du produit */}
          <img
            src={productInfos?.data.imagesUrls[0]}
            alt={productInfos?.data.headline}
            style={{ maxWidth: "300px", height: "auto" }}
          />
        </Box>

        <Box className="product-infos-box">
          {/* Nom du produit */}
          <Typography variant="h6" marginBottom={2}>
            {productInfos?.data.headline}
          </Typography>

          {/* Score */}
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1vh" }}
          >
            <Rating
              name="product-score"
              value={productInfos?.data?.globalRating.score}
              readOnly
              precision={0.5}
            />
            <Typography sx={{ marginLeft: 1, marginRight: 1 }}>
              {productInfos?.data?.globalRating.score}
            </Typography>
            <Typography>
              sur {productInfos.data.globalRating.nbReviews} avis
            </Typography>
          </Box>

          {/* Prix */}
          <PriceBox
            oldPrice={oldPrice}
            price={newPrice}
            label="Prix neuf"
            isBestPrice={isNewCheaper}
          />
          <PriceBox
            price={usedPrice}
            label="Prix d'occasion"
            isBestPrice={!isNewCheaper}
          />

          {/* Description */}
          {productInfos?.data?.googleRichCards?.description && (
            <Typography variant="subtitle2" marginTop={2}>
              {JSON.parse(`"${productInfos.data.googleRichCards.description}"`)}
            </Typography>
          )}
        </Box>

        {/* Review */}
      </Container>
    </div>
  );
}

export default ProductDetailsInfos;

// {/* Note / Avis */}
// {/* {productInfos.data && (
//   <Typography variant="body1" marginTop={2}>
//     Note : {productInfos.data.reviews[0]} / 5
//   </Typography>
// )} */}