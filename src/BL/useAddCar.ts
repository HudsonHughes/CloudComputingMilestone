import { useState } from 'react';
import { carService } from '../DAO/CarService';

interface CarData {
  color: string;
  make: string;
  mileage: string;
  model: string;
  price: number;
  imageUrl: string;
}

const useAddCar = () => {
  const [carData, setCarData] = useState<CarData>({
    color: '',
    make: '',
    mileage: '',
    model: '',
    price: 0,
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await carService.addCar(carData);
      setSuccessMessage('Car added successfully!');
      setErrorMessage('');
      setCarData({
        color: '',
        make: '',
        mileage: '',
        model: '',
        price: 0,
        imageUrl: '',
      });
    } catch (error) {
      setErrorMessage('Failed to add car.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return {
    carData,
    handleChange,
    handleSubmit,
    loading,
    errorMessage,
    successMessage,
  };
};

export default useAddCar;
