import React from 'react';
import useAddCar from '../BL/useAddCar';

const Add: React.FC = () => {
  const { carData, handleChange, handleSubmit, loading, errorMessage, successMessage } = useAddCar();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={carData.color}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Make</label>
          <input
            type="text"
            name="make"
            value={carData.make}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mileage</label>
          <input
            type="text"
            name="mileage"
            value={carData.mileage}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={carData.price}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={carData.imageUrl}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            disabled={loading}
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
