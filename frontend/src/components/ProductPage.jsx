import { useState } from "react";
import api from "../api/axios";

export default function ProductForm() {
  const [form, setForm] = useState({});

  const submit = async () => {
    try {
      await api.post("/products", form);
      alert("Product created");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Image URL" onChange={e => setForm({ ...form, image: e.target.value })} />
      <button onClick={submit}>Create</button>
    </div>
  );
}