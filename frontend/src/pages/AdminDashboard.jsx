import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Snackbar from "../components/Snackbar";
import Loader from "../components/Loader";
import api from "../api/axios";


const initialForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  stock: "",
  category: "ELECTRONICS",
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: "", type: "success" });


  /* FETCH PRODUCTS */
  const fetchProducts = async () => {
    const res = await api.get("/products");
    // hide soft-deleted products
    setProducts(res.data.products.filter(p => p.isActive));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* CREATE OR UPDATE PRODUCT */
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     if (editingId) {
  //       // UPDATE
  //       await api.put(`/products/${editingId}`, form);
  //     } else {
  //       // CREATE
  //       await api.post("/products", form);
  //     }

  //     setForm(initialForm);
  //     setEditingId(null);
  //     fetchProducts();
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Operation failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
setLoading(true);
try{
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("price", form.price);
  formData.append("description", form.description);
  formData.append("stock", form.stock);
  formData.append("category", form.category);

  if (form.image) {
    formData.append("image", form.image); // 🔥 FILE
  }

  if (editingId) {
    await api.put(`/products/${editingId}`, formData);
     setSnackbar({
    message: "Product updated",
    type: "success",
  });
  } else {
    await api.post("/products", formData);
      setSnackbar({
    message: "Product created",
    type: "success",
  });
  }


  fetchProducts();
}catch(err){
  setSnackbar({
    message: err.response?.data?.message || "Operation failed",
    type: "error",
  });
}finally{
  setLoading(false);
  setForm(initialForm);
  setEditingId(null);
}

};

  /* EDIT PRODUCT */
  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      stock: product.stock,
      category: product.category,
    });
   
  };

  /* DELETE PRODUCT */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await api.delete(`/products/${id}`);
    fetchProducts();
    setSnackbar({
    message: "Product deleted",
    type: "success",
  });
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="admin-grid">
        {/* LEFT: CREATE / UPDATE */}
        <div className="admin-form">
          <h3>{editingId ? "Update Product" : "Create Product"}</h3>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />

            <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setForm({ ...form, image: e.target.files[0] })
  }
/>

            <input
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>ELECTRONICS</option>
              <option>CLOTHING</option>
              <option>BOOKS</option>
              <option>OTHER</option>
            </select>

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <button disabled={loading}>
              {loading
                ? "Please wait..."
                : editingId
                ? "Update Product"
                : "Create Product"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setForm(initialForm);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* RIGHT: PRODUCT LIST */}
        <div className="admin-table">
          <h3>Products</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button
                      className="danger"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="4">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {loading && <Loader />}
{snackbar && (
  <Snackbar
    message={snackbar.message}
    type={snackbar.type}
    onClose={() => setSnackbar(null)}
  />
)}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;