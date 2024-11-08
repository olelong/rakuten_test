import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Rating,
  Button,
  Breadcrumbs,
  Link,
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

function Review({ title, name, note, comment }) {
  return (
    <Box
      sx={{ borderBottom: "1px solid #ddd", paddingBottom: 2, marginBottom: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Rating name="review-note" value={note} readOnly precision={0.5} />
      </Box>

      <Typography variant="body1" marginTop={1}>
        {comment}
      </Typography>
    </Box>
  );
}

function DisplayReviewList({ reviews, reviewsPerPage }) {
  // Ajout de la pagination pour lorsque le nombre d'avis est trop élevé.

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  if (!reviews || reviews.length === 0) {
    return (
      <Box className="reviews-box">
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Aucun avis sur ce produit.
        </Typography>
      </Box>
    );
  }
  return (
    <Box className="reviews-box">
      <Typography variant="h6" fontWeight="bold" marginBottom={2}>
        Avis des clients
      </Typography>
      {currentReviews.map((review, index) => (
        <Review
          key={index}
          title={review.title}
          name={review.author.firstName}
          note={review.note}
          comment={review.description}
        />
      ))}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        gap={1}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? "contained" : "outlined"}
            size="small"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

function ProductBreadcrumbs({ breadcrumbs }) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumbs>
      {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb, index) => (
        <Link
          key={index}
          underline="hover"
          color="inherit"
          href={"#"} //{breadcrumb.url || "#"}
          className="breadcrumbs-link"
        >
          {breadcrumb.label}
        </Link>
      ))}
      <Typography color="text.primary">
        {breadcrumbs[breadcrumbs.length - 1]?.label}
      </Typography>
    </Breadcrumbs>
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

  const reviews = productInfos?.data?.reviews;
  const breadcrumbs = Array.isArray(productInfos?.data?.breadcrumbs)
    ? productInfos?.data?.breadcrumbs
    : [];

  // Requête fetch pour récupérer les détails du produit.
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetch(`${API_PRODUCT_BASE_URL}${productId}`);
        if (!response.ok) {
          throw new Error(
            "Erreur de récupération des informations du produit."
          );
        }

        const data = await response.json();
        if (!data?.data) {
          throw new Error(
            "Le produit que vous cherchez n'existe pas ou est temporairement indisponible."
          );
        } else setProductInfos(data);
      } catch (err) {
        if (err.message.includes("Failed to fetch")) {
          setError(
            "Un problème de connexion est survenu. Veuillez vérifier votre connexion ou réessayer plus tard."
          );
        } else {
          setError("Une erreur est survenue, veuillez réessayer.");
        }
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [productId]);


  if (loading) {
    return (
      <Box className="box-center">
        <CircularProgress />
        <Typography>Chargement en cours...</Typography>
      </Box>
    );
  }

  if (error || productInfos.data === "product not found") {
    return (
      <Box className="box-center">
        <Typography>
          Nous avons rencontré un problème. <br /> Veuillez réessayer plus tard.
        </Typography>
      </Box>
    );
  }

  if (productInfos && productInfos.data) {
    return (
      <div className="product-detail-page">
        {/* Fil d'ariane */}
        <Container>
          <ProductBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>

        {/* Fiche Produit */}
        <Container className="product-infos-container">
          <Box className="product-image">
            <img
              src={productInfos?.data.imagesUrls[0]}
              alt={productInfos?.data?.headline}
              style={{ maxWidth: "300px", height: "auto" }}
            />
          </Box>

          <Box className="product-infos-box">
            <Typography variant="h6" marginBottom={2}>
              {productInfos?.data.headline}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1vh",
              }}
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

            {productInfos?.data?.googleRichCards?.description && (
              <Typography variant="subtitle2" marginTop={2}>
                {JSON.parse(
                  `"${productInfos.data.googleRichCards.description}"`
                )}
              </Typography>
            )}
          </Box>

          <DisplayReviewList reviews={reviews} reviewsPerPage={5} />
        </Container>
      </div>
    );
  } else {
    <Typography>
      {" "}
      Le produit que vous cherchez n'existe pas ou est temporairement
      indisponible.
    </Typography>;
  }
}

export default ProductDetailsInfos;
