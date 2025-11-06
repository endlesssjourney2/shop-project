import { type FC, useEffect, useState } from "react";
import s from "./Admin.module.css";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { api } from "../../api";
import AdminProductCard from "../../components/AdminProductCard/AdminProductCard";

const Admin: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [addProducts, setAddProducts] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    photoUrl: "",
  });
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      const res = await api.get<Product[]>("/products");
      setProducts(res.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setError(message);
    }
  };

  const addItem = async () => {
    if (
      !addProducts.name ||
      !addProducts.price ||
      !addProducts.category ||
      !addProducts.description ||
      !addProducts.photoUrl
    )
      return console.error("Type new product");

    await api.post("/products", addProducts);
    await loadItems();
    setAddProducts({
      name: "",
      price: "",
      category: "",
      description: "",
      photoUrl: "",
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
    <div className={s.adminPanel}>
      <header className={s.adminHeader}>
        <h1 className={s.adminTitleHeader}>Admin panel</h1>
      </header>
      <div className={s.addContainer}>
        <h3 className={s.adminInfo}>Name</h3>
        <input
          className={s.adminInput}
          type="text"
          value={addProducts.name}
          onChange={(e) =>
            setAddProducts({ ...addProducts, name: e.target.value })
          }
        />
        <h3 className={s.adminInfo}>Price</h3>
        <input
          className={s.adminInput}
          type="number"
          value={addProducts.price}
          onChange={(e) =>
            setAddProducts({ ...addProducts, price: e.target.value })
          }
        />
        <h3 className={s.adminInfo}>Category</h3>
        <input
          className={s.adminInput}
          type="text"
          value={addProducts.category}
          onChange={(e) =>
            setAddProducts({ ...addProducts, category: e.target.value })
          }
        />
        <h3 className={s.adminInfo}>Description</h3>
        <textarea
          className={s.adminInput}
          value={addProducts.description}
          onChange={(e) =>
            setAddProducts({ ...addProducts, description: e.target.value })
          }
        />
        <h3 className={s.adminInfo}>Photo URL</h3>
        <input
          className={s.adminInput}
          type="text"
          placeholder="https://..."
          value={addProducts.photoUrl}
          onChange={(e) =>
            setAddProducts({ ...addProducts, photoUrl: e.target.value })
          }
        />
        <button className={s.adminAddBtn} onClick={addItem}>
          Add to database
        </button>
      </div>
      {error ? (
        <p className={s.error}>{error}</p>
      ) : (
        <div className={s.adminItemsContainer}>
          {products.length ? (
            <ul className={s.adminList}>
              {products.map((i) => (
                <li className={s.adminListItem} key={i.id}>
                  <AdminProductCard
                    name={i.name}
                    price={i.price}
                    category={i.category}
                    description={i.description}
                    photoUrl={i.photoUrl}
                  />
                  <button
                    onClick={() => removeItem(i.id)}
                    className={s.deleteBtn}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.noProducts}>No products yet</p>
          )}
        </div>
      )}

      <Link className={s.adminLink} to="/">
        ← Main page
      </Link>
    </div>
  );
};

export default Admin;
