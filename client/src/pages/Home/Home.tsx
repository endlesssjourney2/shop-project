import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { api } from "../../api/api";
import type { Product } from "../../types/product";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Badge,
} from "@mui/material";
import { X, Search, Leaf, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Cart from "../../components/Cart/Cart";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortMethod, setSortMethod] = useState("default");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { cartItems, toggleCart, addToCart } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const uniqueCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    );

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortMethod) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return <div className={s.loading}>Loading...</div>;
  }

  return (
    <div className={s.homepage}>
      <header className={s.header}>
        <div className={s.logo}>
          <Leaf size={26} />
          <span>GreenLeaf</span>
        </div>

        <div className={s.searchContainer}>
          <Search className={s.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search for plants..."
            className={s.searchInput}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <nav className={s.authNav}>
          <IconButton
            color="inherit"
            onClick={toggleCart}
            sx={{
              backgroundColor: "#f5f0e8",
              padding: "8px",
              marginRight: "10px",
            }}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <>
              <Link to="/admin" className={s.navLink}>
                Admin
              </Link>
              <button onClick={handleLogout} className={s.navButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={s.navLink}>
                Login
              </Link>
              <Link to="/register" className={`${s.navLink} ${s.highlight}`}>
                Registration
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className={s.mainContent}>
        <div className={s.catalogHeader}>
          <h2>All Products</h2>
        </div>

        <div className={s.controlsContainer}>
          <div className={s.categoryFilters}>
            {uniqueCategories.map((category) => (
              <button
                key={category}
                className={`${s.categoryBtn} ${
                  selectedCategory === category ? s.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={s.sortContainer}>
            <select
              className={s.sortSelect}
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value)}
            >
              <option value="default">Domyślnie</option>
              <option value="price-asc">Cena: od najtańszych</option>
              <option value="price-desc">Cena: od najdroższych</option>
              <option value="name-asc">Nazwa: A-Z</option>
            </select>
          </div>
        </div>

        <div className={s.productsGrid}>
          {sortedAndFilteredProducts.length === 0 ? (
            <p className={s.noProductsFound}>Nie znaleziono produktów</p>
          ) : (
            sortedAndFilteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onModalOpen={() => handleOpenModal(product)}
              />
            ))
          )}
        </div>
      </main>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle className={s.modalTitle}>
              {selectedProduct.name}
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                className={s.closeButton}
              >
                <X />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers className={s.modalContent}>
              <div className={s.modalLayout}>
                <img
                  src={selectedProduct.photoUrl}
                  alt={selectedProduct.name}
                  className={s.modalImage}
                />
                <div className={s.modalDetails}>
                  <p className={s.modalDescription}>
                    {selectedProduct.description}
                  </p>
                  <p className={s.modalCategory}>{selectedProduct.category}</p>
                  <p className={s.modalSpecs}>
                    <strong>Care:</strong> {selectedProduct.specs}
                  </p>
                  <div className={s.modalFooter}>
                    <span className={s.modalPrice}>
                      ${selectedProduct.price}
                    </span>
                    <button
                      className={s.modalBuyButton}
                      onClick={() => {
                        addToCart(selectedProduct);
                        handleCloseModal();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
      <footer className={s.footer}>
        <p>© 2025 GreenLeaf. All rights reserved.</p>
        <p>Created for an educational project.</p>
      </footer>
      <Cart />
    </div>
  );
};

export default Home;
