import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/firestore';

const Add: React.FC = () => {
  const [car, setCar] = useState({ color: '', make: '', mileage: '', model: '', price: '', imageUrl: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!car.color || !car.make || !car.mileage || !car.model || !car.price || !car.imageUrl) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (isNaN(Number(car.price))) {
      setErrorMessage('Price must be a number.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await addDoc(collection(firestore, 'cars'), {
        color: car.color,
        make: car.make,
        mileage: car.mileage,
        model: car.model,
        price: Number(car.price),
        imageUrl: car.imageUrl
      });
      setSuccessMessage('Car added successfully!');
      setErrorMessage('');
      setCar({ color: '', make: '', mileage: '', model: '', price: '', imageUrl: '' });
    } catch (error) {
      setErrorMessage('Failed to add car.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Add New Car
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <div>
            <label htmlFor="color" className="block text-sm font-medium leading-6 text-black">
              Color
            </label>
            <div className="mt-2">
              <input
                id="color"
                name="color"
                type="text"
                required
                value={car.color}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="make" className="block text-sm font-medium leading-6 text-black">
              Make
            </label>
            <div className="mt-2">
              <input
                id="make"
                name="make"
                type="text"
                required
                value={car.make}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="mileage" className="block text-sm font-medium leading-6 text-black">
              Mileage
            </label>
            <div className="mt-2">
              <input
                id="mileage"
                name="mileage"
                type="text"
                required
                value={car.mileage}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium leading-6 text-black">
              Model
            </label>
            <div className="mt-2">
              <input
                id="model"
                name="model"
                type="text"
                required
                value={car.model}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-black">
              Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="text"
                required
                value={car.price}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-black">
              Image URL
            </label>
            <div className="mt-2">
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                required
                value={car.imageUrl}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
