import { Box, Container } from "@mui/material";
import ProductDetailsInfos from "./ProductDetailsInfos";

import logo from "../assets/rakuten-logo.svg";
import "../styles/ProductDetailsPage.css";

function ProductDetailsPage() {
  //   const { productId } = useParams(); // Permet de récupérer l'ID présent dans l'URL.

  return (
    <div className="product-details-page">
      <Container sx={{ flex: 1 }}>
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src={logo}
            alt="Rakuten's logo"
            className="logo-rakuten"
          />
        </Box>
      </Container>

      <ProductDetailsInfos />
      <footer className="product-footer">
        {" "}
        © 2024 Rakuten test by Oriane Lelong. Tous droits réservés.
        <br />
        Conditions générales | Politique de confidentialité
        <br />{" "}
      </footer>
    </div>
  );
}

export default ProductDetailsPage;

// Fil d'ariane
// <Breadcrumbs>
//   <Link
//     underline="hover"
//     color="inherit"
//     href="#"
//     className="breadcrumbs-link"
//   >
//     <HomeIcon className="breadcrumbs-icon" />
//     Accueil
//   </Link>
//   <Link
//     underline="hover"
//     color="inherit"
//     href="#"
//     className="breadcrumbs-link"
//   >
//     {" "}
//     {/* On peut remplacer le "#" par le bon url, ex: "/jeux-videos-et-consoles" */}
//     <GamesIcon className="breadcrumbs-icon" />
//     Jeux vidéo & Consoles
//   </Link>
//   <Link
//     underline="hover"
//     color="inherit"
//     href="#"
//     className="breadcrumbs-link"
//   >
//     <SportEsportsIcon className="breadcrumbs-icon" />
//     Jeux Vidéo
//   </Link>
//   <Typography color="text.primary">Jeux vidéo PS5</Typography>
// </Breadcrumbs>
