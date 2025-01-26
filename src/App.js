import React, { useState, useEffect } from "react";
import SearchBar from "./components/search/searchbar";
import ProductCard from "./components/product/productCard";
import Sidebar from "./components/sidebar/sidebar";
import Links from "./components/links/links";
import Logo from "./components/logo/logo";
import productsData from "./data.json";
import { Grid, Container, Box, IconButton, Drawer } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './index.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    // Configurar os produtos
    setProducts(productsData);

    // Obter categorias únicas a partir do campo Category.CategoryName
    const uniqueCategories = [
      ...new Set(productsData.map((product) => product.Category.CategoryName)),
    ];
    setCategories(uniqueCategories);
  }, [productsData]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      // Verificar se a categoria está selecionada
      (!selectedCategories.length ||
        selectedCategories.includes(product.Category.CategoryName)) &&
      // Verificar se o nome do produto corresponde à pesquisa
      product.ProductName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container>
      {/* Topo com barra de pesquisa, logo e menu hambúrguer */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo - Apenas em telas grandes */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Logo />
        </Box>

        {/* Ícone do menu hambúrguer - Apenas em telas pequenas */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            style={{ color: "white" }}
            onClick={toggleDrawer(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Box>

        {/* Barra de pesquisa */}
        <Box flexGrow={1} marginLeft={{ xs: 0, sm: 2 }}>
          <SearchBar searchValue={searchValue} onSearchChange={setSearchValue} />
        </Box>
      </Box>

      {/* Menu hambúrguer lateral */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box className="drawer">
          {/* Logo dentro do Drawer */}
          <Box>
            <Logo />
          </Box>
          <Sidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
          <Links />
        </Box>
      </Drawer>

      {/* Conteúdo principal */}
      <Box marginTop={4}>
        <Grid container spacing={2}>
          {/* Sidebar em telas grandes */}
          <Grid
            item
            xs={3}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Sidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
            <Links />
          </Grid>

          {/* Cards de produtos */}
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={6} sm={6} md={4} key={product.IdProduct}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;