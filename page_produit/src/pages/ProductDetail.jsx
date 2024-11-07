import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Link,
  Typography,
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GamesIcon from "@mui/icons-material/Games";
import SportEsportsIcon from "@mui/icons-material/SportsEsports";

import { API_PRODUCT_BASE_URL } from "../config";

import logo from "../assets/rakuten-logo.svg";

import "../styles/ProductDetail.css";

function ProductDetail() {
  const { productId } = useParams(); // Permet de récupérer l'ID présent dans l'URL.
  const [productInfos, setProductInfos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("HERE:", productId);

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
    <div>
      <Container>
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src={logo}
            alt="Rakuten's logo"
            className="logo-rakuten"
          />
        </Box>

        {/* Fil d'ariane */}
        <Breadcrumbs>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            className="breadcrumbs-link"
          >
            <HomeIcon sx={{ marginRight: 0.5, width: "auto", height: 25 }} />
            Accueil
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            className="breadcrumbs-link"
          >
            {" "}
            {/* On peut remplacer le "#" par le bon url, ex: "/jeux-videos-et-consoles" */}
            <GamesIcon />
            Jeux vidéo & Consoles
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            className="breadcrumbs-link"
          >
            <SportEsportsIcon />
            Jeux Vidéo
          </Link>
          <Typography color="text.primary">Jeux vidéo PS5</Typography>
        </Breadcrumbs>
      </Container>

      {/* Fiche Produit */}

      <Container>
        <Box className="product-image">
          {/* Image du produit */}
          <img
            src={productInfos.data.imagesUrls[0]}
            alt={productInfos.name}
            style={{ width: "300px", height: "auto", marginBottom: "20px" }}
          />
        </Box>

        <Box className="product-infos-box" marginTop={4} padding={2}>
          {/* Nom du produit */}
          <Typography variant="h5" marginBottom={2}>
            {productInfos.data.headline}
          </Typography>
          {/* Prix et prix remisé */}
          <Typography
            variant="h6"
            color={
              productInfos.discountPrice ? "text.secondary" : "text.primary"
            }
          >
            Meilleur prix neuf: {productInfos.data.summaryNewBestPrice} €
            Meilleur prix d'occasion: {productInfos.data.usedBestPrice} €
          </Typography>
          {productInfos.discountPrice && (
            <Typography variant="h6" color="text.primary">
              Prix remisé : {productInfos.discountPrice} €
            </Typography>
          )}
          {/* Description */}
          <Typography variant="body1" marginTop={2}>
            {JSON.parse(`"${productInfos.data.googleRichCards.description}"`)}
          </Typography>
          {/* Note / Avis */}
          {/* {productInfos.data && (
            <Typography variant="body1" marginTop={2}>
              Note : {productInfos.data.reviews[0]} / 5
            </Typography>
          )} */}
        </Box>
      </Container>
    </div>
  );
}

export default ProductDetail;
