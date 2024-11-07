import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Link, Typography, Breadcrumbs } from "@mui/material";

import { API_PRODUCT_BASE_URL } from '../config';

import logo from "../rakuten-logo.svg";
import "../styles/ProductDetail.css";


function ProductDetail() {
  const {productId} = useParams(); // Permet de récupérer l'ID présent dans l'URL.
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
          throw new Error('Failed to fetch product details');
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

  if (loading) return <p>Loading...</p>;
  else {
    console.log(productInfos);
  }

  if (error) return <p>Error : {error}</p>;


  return (
    <div className="ProductDetail">
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={logo}
          alt="Rakuten's logo"
          sx={{
            width: "20vh",
            height: "auto",
            marginRight: 2,
            marginBottom: "2vh",
          }}
        />
      </Box>
      <Container>

        {/* Fil d'ariane */}
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="#"sx={{ cursor: 'not-allowed'}}>
            Accueil
          </Link>
          <Link underline="hover" color="inherit" href="#">  {/* On peut remplacer le "#" par le bon url, ex: "/jeux-videos-et-consoles" */}
          Jeux vidéo & Consoles
          </Link>
          <Link underline="hover" color="inherit" href="#">
          Jeux Vidéo
          </Link>
          <Typography color="text.primary">Jeux vidéo PS5</Typography>
        </Breadcrumbs>

        {/* <Box
        component="img"
        src={logo}
        alt=""
        sx={{
        }}
      /> */}
      </Container>
    </div>
  );
}

export default ProductDetail;
