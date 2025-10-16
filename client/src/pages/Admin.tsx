import { type FC, useEffect, useState } from "react";
import "../App.css";
import { type Product } from "../types/product";
import { Link } from "react-router-dom";
import { api } from "../api";

const Admin: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [addProducts, setAddProducts] = useState({
    name: "",
    price: "",
    category: "",
  });

  const loadItems = async () => {
    const res = await api.get<Product[]>("/products");
    setProducts(res.data);
  };

  const addItem = async () => {
    if (!addProducts.name || !addProducts.price || !addProducts.category)
      return console.error("Type new product");
    await api.post("/products", addProducts);
    await loadItems();
    setAddProducts({
      name: "",
      price: "",
      category: "",
    });
  };

  const removeItem = async (id: number) => {
    await api.delete(`/products/${id}`);
    await loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1 className="admin-title-header">Admin panel</h1>
      </header>
      <div className="add-container">
        <h3 className="admin-info">Name</h3>
        <input
          className="admin-input"
          type="text"
          value={addProducts.name}
          onChange={(e) =>
            setAddProducts({ ...addProducts, name: e.target.value })
          }
        />
        <h3 className="admin-info">Price</h3>
        <input
          className="admin-input"
          type="number"
          value={addProducts.price}
          onChange={(e) =>
            setAddProducts({ ...addProducts, price: e.target.value })
          }
        />
        <h3 className="admin-info">Category</h3>
        <input
          className="admin-input"
          type="text"
          value={addProducts.category}
          onChange={(e) =>
            setAddProducts({ ...addProducts, category: e.target.value })
          }
        />
        <button className="admin-addBtn" onClick={addItem}>
          Add to database
        </button>
      </div>
      <div className="admin-items-container">
        <ul className="admin-list">
          {products.map((i) => (
            <li className="admin-list-item" key={i.id}>
              <h2 className="admin-list-item-title">{i.name}</h2>
              <h2 className="admin-list-item-price">{i.price}</h2>
              <p className="admin-list-item-category">{i.category}</p>
              <button onClick={() => removeItem(i.id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Link className="admin-link" to="/">
        ← Main page
      </Link>
    </div>
  );
};

export default Admin;
