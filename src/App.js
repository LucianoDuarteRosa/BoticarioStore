import React, { useState, useEffect } from "react";
import SearchBar from "./components/search/searchbar";
import ProductCard from "./components/product/productCard";
import Sidebar from "./components/sidebar/sidebar";
import Links from "./components/links/links";
import Logo from "./components/logo/logo";
import productsData from "./data.json";
import { Grid, Container, Box, IconButton, Drawer } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
    const shuffleArray = (array) => {
      return array
        .map((value) => ({ value, sort: Math.random() })) // Adiciona um valor aleatório
        .sort((a, b) => a.sort - b.sort) // Ordena aleatoriamente
        .map(({ value }) => value); // Retorna apenas os valores originais
    };

    setProducts(shuffleArray(productsData.products));

    const categoriesSet = new Map();

    productsData.products.forEach((product) => {
      const key = `${product.Category.CategoryName}-${product.Category.SuperCategoryName}`;
      if (!categoriesSet.has(key)) {
        categoriesSet.set(key, {
          CategoryName: product.Category.CategoryName,
          SuperCategoryName: product.Category.SuperCategory.SuperCategoryName,
        });
      }
    });

    const categoriesArray = Array.from(categoriesSet.values());

    /*if (productsData.products.some((product) => product.Promotion)) {
      categoriesSet.add("Promoção");
    }

    const uniqueCategories = [
      "Promoção",
      ...Array.from(categoriesSet)
        .filter(c => c !== "Promoção")
        .sort((a, b) => a.localeCompare(b))
    ];
    
        const uniqueCategories = [
          ...Array.from(categoriesSet)
            .sort((a, b) => a.localeCompare(b))
        ];
    */

    const groupedCategories = categoriesArray.reduce((acc, category) => {
      const { SuperCategoryName, CategoryName } = category;

      if (!acc[SuperCategoryName]) {
        acc[SuperCategoryName] = [];
      }

      acc[SuperCategoryName].push(CategoryName);
      return acc;
    }, {});

    setCategories(groupedCategories);
  }, []);


  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const isCategorySelected =
      !selectedCategories.length ||
      selectedCategories.includes(product.Category.CategoryName) ||
      (selectedCategories.includes("Promoção") && product.Promotion);

    return isCategorySelected && product.ProductName.toLowerCase().includes(searchValue.toLowerCase());
  });

  const whatsappMessage = `Olá! Gostaria de saber mais sobre o site. Poderia me ajudar?`;
  const whatsappUrl = `https://wa.me/5532988996771?text=${encodeURIComponent(whatsappMessage)}`
  const linkedIn = "https://www.linkedin.com/in/lucianoduarterosa";
  const email = "lucianoduarterosa@hotmail.com";
  const subject = "Desenvolvimento de site";
  const body = "Olá, gostaria de saber mais informações.";

  return (
    <Container style={{ marginTop: "1.5rem" }}>
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
        <Box flexGrow={1}>
          <SearchBar searchValue={searchValue} onSearchChange={setSearchValue} />
        </Box>
      </Box>

      {/* Menu hambúrguer lateral */}
      <Drawer
        className="drawer"
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box className="drawer-box">
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
      <Box>
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
          <Grid item xs={11} sm={8}>
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
      <Box className="footer">
        <p>© 2025 - Luciano Duarte. Contato:
          <span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} className="social-icon-app" />
            </a>
          </span>
          <span>
            <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>
              <FontAwesomeIcon icon={faEnvelope} className="social-icon-app" />
            </a>
          </span>
          <span>
            <a href={linkedIn} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon-app" />
            </a>
          </span>
        </p>
      </Box>
    </Container>
  );
}

export default App;