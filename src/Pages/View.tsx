import React from 'react';
import { Link } from 'react-router-dom';
import useCarList from '../BL/useCarList';

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
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td><img src={car.imageUrl} alt={car.model} className="w-32 h-32 object-cover" /></td>
              <td>{car.color}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.mileage}</td>
              <td>{car.price}</td>
              <td><Link to={`/edit/${car.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
