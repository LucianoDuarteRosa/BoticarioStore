import React, { useState, useEffect } from "react";
import SearchBar from "./components/search/searchbar";
import ProductCard from "./components/product/productCard";
import Sidebar from "./components/sidebar/sidebar";
import Links from "./components/links/links";
import Logo from "./components/logo/logo";
import productsData from "./data.json";
import { Grid, Container, Box } from "@mui/material";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
      <Box marginTop={4}>
        <Grid container spacing={2}>
          {/* Barra lateral */}
          <Grid item xs={3}>
            <Logo />
            <Sidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
            <Links />
          </Grid>
          {/* Pesquisa e cards de produtos */}
          <Grid item xs={8}>
            <SearchBar searchValue={searchValue} onSearchChange={setSearchValue} />
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product.IdProduct}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
