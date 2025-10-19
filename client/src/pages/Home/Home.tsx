import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { api } from "../../api";
import type { Product } from "../../types/product";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortMethod, setSortMethod] = useState("default");

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
      <header className={s.homepageHeader}>
        <h1>Product catalog</h1>
        <nav>
          <Link to="/admin">Admin Panel</Link>
        </nav>
      </header>

      <div className={s.filtersContainer}>
        <input
          type="text"
          placeholder="Search by name..."
          className={s.searchInput}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
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
        <div className={s.categoryFilters}>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`${s.categoryBtn} ${
                selectedCategory === category ? `${s.active}` : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={s.productsGrid}>
        {sortedAndFilteredProducts.length === 0 ? (
          <p className={s.noProductsFound}>Nie znaleziono produktów</p>
        ) : (
          sortedAndFilteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
