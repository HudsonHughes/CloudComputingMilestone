import { useEffect, useState } from 'react';
import { carService } from '../DAO/CarService';

interface Car {
  id: string;
  color: string;
  make: string;
  mileage: string;
  model: string;
  price: number;
  imageUrl: string;
}

const useEditCar = (id: string) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const fetchedCar = await carService.getCarById(id);
        setCar(fetchedCar);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch car data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (car) {
      setCar({
        ...car,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (car) {
      try {
        await carService.updateCar(id, car);
        setSuccessMessage('Car updated successfully!');
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to update car.');
        setSuccessMessage('');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await carService.deleteCar(id);
      setSuccessMessage('Car deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete car.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return {
    car,
    handleChange,
    handleSubmit,
    handleDelete,
    loading,
    errorMessage,
    successMessage
  };
};

export default useEditCar;
