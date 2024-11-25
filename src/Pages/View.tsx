import React from "react";
import { Link } from "react-router-dom";
import useCarList from "../BussinessLogic/useCarList";

const View: React.FC = () => {
  const { cars, loading, errorMessage } = useCarList();

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Car Listings</h1>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th>Image</th>
            <th>Color</th>
            <th>Make</th>
            <th>Model</th>
            <th>Mileage</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#f9f9f9" }}>
          {cars.map((car) => (
            <tr
              key={car.id}
              style={{
                borderBottom: "1px solid #ddd",
                transition: "background-color 0.2s",
              }}
            >
              <td style={{ padding: "12px", textAlign: "center" }}>
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {car.color}
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {car.make}
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {car.model}
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {car.mileage}
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {car.price}
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                <Link
                  to={`/edit/${car.id}`}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-block",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement; 
                    target.style.backgroundColor = "#0056b3";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement; 
                    target.style.backgroundColor = "#007bff";
                  }}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
