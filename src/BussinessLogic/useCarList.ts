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

const useCarList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await carService.getAllCars();
        setCars(fetchedCars);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch car list.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, loading, errorMessage };
};

export default useCarList;
