import React, { useState, useEffect } from 'react';
import { carService } from '../DAO/CarService';
import { useParams, useNavigate } from 'react-router-dom';

const Edit: React.FC = () => {
  const [car, setCar] = useState({ color: '', make: '', mileage: '', model: '', price: '', imageUrl: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) {
        setErrorMessage('No car ID provided.');
        return;
      }
      try {
        const fetchedCar = await carService.getCarById(id);
        
        console.log("Fetched Car:", fetchedCar);
        
        if (fetchedCar) {
          const { color, make, mileage, model, price, imageUrl } = fetchedCar;
          setCar({ color, make, mileage, model, price, imageUrl });
        } else {
          setErrorMessage('Car data is incomplete or missing.');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch car data.');
      }
    };
  
    fetchCar();
  }, [id]);
  
  

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
    if (!id) {
      setErrorMessage('No car ID available.');
      return;
    }
    try {
      await carService.updateCar(id, {
        color: car.color,
        make: car.make,
        mileage: car.mileage,
        model: car.model,
        price: Number(car.price),
        imageUrl: car.imageUrl,
      });
      setSuccessMessage('Car updated successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to update car.');
      setSuccessMessage('');
    }
  };

  const handleDelete = async () => {
    if (!id) {
      setErrorMessage('No car ID available.');
      return;
    }
    try {
      await carService.deleteCar(id);
      setSuccessMessage('Car deleted successfully!');
      setErrorMessage('');
      navigate('/view'); // Redirect back to view page after deletion
    } catch (error) {
      setErrorMessage('Failed to delete car.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Edit Car
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
              Update Car
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
