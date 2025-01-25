import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchbar";
import ProductCard from "./components/productCard";
import Sidebar from "./components/sidebar";
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
        {/* Barra de pesquisa */}
        <SearchBar searchValue={searchValue} onSearchChange={setSearchValue} />
        <Grid container spacing={2}>
          {/* Barra lateral com categorias */}
          <Grid item xs={3}>
            <Sidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </Grid>
          {/* Cards de produtos */}
          <Grid item xs={9}>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.IdProduct}>
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
