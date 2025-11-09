import { type FC, useEffect, useState } from "react";
import s from "./Admin.module.css";
import { Link } from "react-router-dom";
import type { Product, Touched } from "../../types/product";
import { api } from "../../api";
import AdminProductCard from "../../components/AdminProductCard/AdminProductCard";
import { Button, TextField } from "@mui/material";
import { inputSx } from "./InputStyles";

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
  const [touched, setTouched] = useState<Touched>({
    name: false,
    price: false,
    category: false,
    description: false,
    photoUrl: false,
  });

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
    setTouched({
      name: false,
      price: false,
      category: false,
      description: false,
      photoUrl: false,
    });
  };

  const removeItem = async (id: string) => {
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
        <TextField
          error={touched.name && addProducts.name === ""}
          helperText={
            touched.name && addProducts.name === "" ? "Name is required" : ""
          }
          fullWidth
          label="Name"
          variant="outlined"
          className={s.adminInput}
          type="text"
          value={addProducts.name}
          onChange={(e) =>
            setAddProducts({ ...addProducts, name: e.target.value })
          }
          onBlur={() => setTouched({ ...touched, name: true })}
          sx={inputSx}
        />

        <TextField
          error={touched.price && addProducts.price === ""}
          helperText={
            touched.price && addProducts.price === "" ? "Price is required" : ""
          }
          fullWidth
          label="Price"
          variant="outlined"
          className={s.adminInput}
          type="text"
          value={addProducts.price}
          onChange={(e) =>
            setAddProducts({ ...addProducts, price: e.target.value })
          }
          onBlur={() => setTouched({ ...touched, price: true })}
          sx={inputSx}
        />

        <TextField
          error={touched.category && addProducts.category === ""}
          helperText={
            touched.category && addProducts.category === ""
              ? "Category is required"
              : ""
          }
          fullWidth
          label="Category"
          variant="outlined"
          className={s.adminInput}
          type="text"
          value={addProducts.category}
          onChange={(e) =>
            setAddProducts({ ...addProducts, category: e.target.value })
          }
          onBlur={() => setTouched({ ...touched, category: true })}
          sx={inputSx}
        />

        <TextField
          error={touched.description && addProducts.description === ""}
          helperText={
            touched.description && addProducts.description === ""
              ? "Description is required"
              : ""
          }
          fullWidth
          label="Description"
          variant="outlined"
          className={s.adminInput}
          type="text"
          value={addProducts.description}
          onChange={(e) =>
            setAddProducts({ ...addProducts, description: e.target.value })
          }
          onBlur={() => setTouched({ ...touched, description: true })}
          sx={inputSx}
        />

        <TextField
          error={touched.photoUrl && addProducts.photoUrl === ""}
          helperText={
            touched.photoUrl && addProducts.photoUrl === ""
              ? "Photo URL is required"
              : ""
          }
          fullWidth
          label="Photo URL"
          variant="outlined"
          className={s.adminInput}
          type="text"
          value={addProducts.photoUrl}
          onChange={(e) =>
            setAddProducts({ ...addProducts, photoUrl: e.target.value })
          }
          onBlur={() => setTouched({ ...touched, photoUrl: true })}
          sx={inputSx}
        />

        <Button
          className={s.adminAddBtn}
          onClick={addItem}
          variant="contained"
          color="success"
        >
          Add to database
        </Button>
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
                    id={""}
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
