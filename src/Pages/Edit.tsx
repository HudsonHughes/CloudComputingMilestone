import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEditCar from '../BL/useEditCar';

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { car, handleChange, handleSubmit, handleDelete, loading, errorMessage, successMessage } = useEditCar(id!);

  if (loading) return <div>Loading...</div>;
  if (!car) return <div>Car not found.</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Edit Car</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={car.color}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Make</label>
          <input
            type="text"
            name="make"
            value={car.make}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mileage</label>
          <input
            type="text"
            name="mileage"
            value={car.mileage}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={car.model}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={car.imageUrl}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            disabled={loading}
          >
            Update Car
          </button>

          <button
            type="button"
            onClick={() => {
              handleDelete();
              navigate('/view');  // Redirect to the view page after deletion
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
            disabled={loading}
          >
            Delete Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
