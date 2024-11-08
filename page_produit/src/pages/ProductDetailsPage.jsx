import { Box, Container } from "@mui/material";
import ProductDetailsInfos from "./ProductDetailsInfos";

import logo from "../assets/rakuten-logo.svg";
import "../styles/ProductDetailsPage.css";

function ProductDetailsPage() {
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
