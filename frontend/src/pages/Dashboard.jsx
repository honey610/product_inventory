import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data.products.filter(p=>p.isActive));
      console.log(res.data.products);
    });
  }, []);

  return (
    <DashboardLayout role="USER">
      <h2>Available Products</h2>

      <div className="card-grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h4>{p.description}</h4>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;