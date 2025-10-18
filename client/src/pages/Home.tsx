import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { api } from "../api";
import "./Home.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}

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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Product catalog</h1>
        <nav>
          <Link to="/admin">Admin Panel</Link>
        </nav>
      </header>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
          className="sort-select"
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="default">Domyślnie</option>
          <option value="price-asc">Cena: od najtańszych</option>
          <option value="price-desc">Cena: od najdroższych</option>
          <option value="name-asc">Nazwa: A-Z</option>
        </select>
        <div className="category-filters">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {sortedAndFilteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
