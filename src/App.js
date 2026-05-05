import { useState, useEffect } from "react";
import SearchBar from "./components/search/searchbar";
import ProductCard from "./components/product/productCard";
import Sidebar from "./components/sidebar/sidebar";
import Links from "./components/links/links";
import Logo from "./components/logo/logo";
import { Grid, Container, Box, IconButton, Drawer } from "@mui/material";
import ProductCardSkeleton from "./components/product/ProductCardSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './index.css';

const PROMOTION_FILTER_KEY = "Promotion";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const shuffleArray = (array) => {
      return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    };

    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/vitrine/produtos`);
        if (!response.ok) throw new Error(`Erro ao carregar produtos: ${response.status}`);
        const data = await response.json();

        setProducts(shuffleArray(data));

        const categoriesSet = new Map();
        data.forEach((product) => {
          const key = product.IdCategory;
          if (!categoriesSet.has(key)) {
            categoriesSet.set(key, {
              IdCategory: product.IdCategory,
              CategoryName: product.Category.CategoryName,
              SuperCategoryName: product.Category.SuperCategory.SuperCategoryName,
            });
          }
        });

        const groupedCategories = Array.from(categoriesSet.values()).reduce((acc, category) => {
          const { SuperCategoryName, CategoryName, IdCategory } = category;
          if (!acc[SuperCategoryName]) acc[SuperCategoryName] = [];
          acc[SuperCategoryName].push({
            IdCategory,
            CategoryName,
          });
          return acc;
        }, {});

        setCategories(groupedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);


  const handleCategoryChange = (categoryIdOrFilter) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryIdOrFilter)
        ? prev.filter((c) => c !== categoryIdOrFilter)
        : [...prev, categoryIdOrFilter]
    );
  };

  const filteredProducts = products.filter((product) => {
    const isPromotionSelected = selectedCategories.includes(PROMOTION_FILTER_KEY);
    const isCategorySelected =
      !selectedCategories.length ||
      selectedCategories.includes(product.IdCategory) ||
      (isPromotionSelected && product.Promotion);

    return isCategorySelected && product.ProductName.toLowerCase().includes(searchValue.toLowerCase());
  });

  const whatsappMessage = `Olá! Gostaria de saber mais sobre o site. Poderia me ajudar?`;
  const whatsappUrl = `https://wa.me/5532988996771?text=${encodeURIComponent(whatsappMessage)}`
  const linkedIn = "https://www.linkedin.com/in/lucianoduarterosa";
  const email = "lucianoduarterosa@hotmail.com";
  const subject = "Desenvolvimento de site";
  const body = "Olá, gostaria de saber mais informações.";

  if (error) {
    return (
      <Container maxWidth={false} disableGutters sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#c00', fontSize: '1.1rem' }}>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>
      </Container>
    );
  }

  return (
    <Container className="app-container" maxWidth={false} disableGutters>

      {/* Hambúrguer - fora do content-shell para position:fixed funcionar corretamente */}
      <Box sx={{
        display: { xs: "flex", md: "none" },
        position: "fixed",
        top: 20,
        left: 25,
        zIndex: 1300,
        transform: drawerOpen ? "translateX(-80px)" : "translateX(0)",
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}>
        <IconButton
          style={{ color: "white", background: "rgba(12,18,32,0.45)", backdropFilter: "blur(8px)", borderRadius: 8 }}
          onClick={toggleDrawer(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>
      </Box>

      <Box className="content-shell">

        {/* Drawer do menu hambúrguer */}
        <Drawer
          className="drawer"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box className="drawer-box">
            <Logo />
            <Sidebar
              categories={categories}
              selectedCategories={selectedCategories}
              promotionFilterKey={PROMOTION_FILTER_KEY}
              onCategoryChange={handleCategoryChange}
            />
            <Links />
          </Box>
        </Drawer>

        {/* Conteúdo principal: sidebar esquerda + cards direita */}
        <Grid container spacing={2}>

          {/* Coluna esquerda: Logo + Categorias + Links — visível só em md+ */}
          <Grid
            item
            md={3}
            sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column" }}
          >
            <Logo />
            <Sidebar
              categories={categories}
              selectedCategories={selectedCategories}
              promotionFilterKey={PROMOTION_FILTER_KEY}
              onCategoryChange={handleCategoryChange}
            />
            <Links />
          </Grid>

          {/* Coluna direita: Barra de pesquisa + Cards */}
          <Grid item xs={12} md={9}>
            <Box mb={2}>
              <SearchBar searchValue={searchValue} onSearchChange={setSearchValue} />
            </Box>
            <Grid container spacing={2}>
              {loading
                ? Array.from({ length: 9 }).map((_, i) => (
                  <Grid item xs={6} sm={6} md={4} key={i}>
                    <ProductCardSkeleton />
                  </Grid>
                ))
                : filteredProducts.map((product) => (
                  <Grid item xs={6} sm={6} md={4} key={product.IdProduct}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              }
            </Grid>
          </Grid>

        </Grid>
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
      </Box>
    </Container>
  );
}

export default App;