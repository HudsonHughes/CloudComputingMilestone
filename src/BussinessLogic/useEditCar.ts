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
  // State to hold the car data being edited
  const [car, setCar] = useState<Car | null>(null);

  // State to indicate if the data is being loaded
  const [loading, setLoading] = useState(true);

  // State to store any error messages if fetching, updating, or deleting fails
  const [errorMessage, setErrorMessage] = useState('');

  // State to store a success message when the car is successfully updated or deleted
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Fetches the car data by its ID when the component mounts or when the ID changes.
   */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        // Attempt to fetch car data from the service
        const fetchedCar = await carService.getCarById(id);
        setCar(fetchedCar);
      } catch (error) {
        // Set an error message if the fetch fails
        setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch car data.');
      } finally {
        // Once the fetch is done (success or failure), set loading to false
        setLoading(false);
      }
    };

    // Fetch car data as soon as the hook runs
    fetchCar();
  }, [id]); // Re-run the effect if the car ID changes

  /**
   * Updates the car data state when form fields are changed by the user.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (car) {
      // Update the car's state based on user input
      setCar({
        ...car,
        [e.target.name]: e.target.value
      });
    }
  };

  /**
   * Handles form submission for updating the car data.
   * Sends the updated car data to the server.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while the update is processing

    if (car) {
      try {
        // Attempt to update the car in the backend using the service
        await carService.updateCar(id, car);

        // On success, show a success message and clear any previous errors
        setSuccessMessage('Car updated successfully!');
        setErrorMessage('');
      } catch (error) {
        // If updating fails, set an error message
        setErrorMessage(error instanceof Error ? error.message : 'Failed to update car.');
        setSuccessMessage('');
      } finally {
        // Stop the loading state once the update is complete
        setLoading(false);
      }
    }
  };

  /**
   * Handles deletion of the car.
   * Sends a request to delete the car from the backend.
   */
  const handleDelete = async () => {
    setLoading(true); // Set loading to true while the deletion is processing
    try {
      // Attempt to delete the car using the service
      await carService.deleteCar(id);

      // On success, show a success message
      setSuccessMessage('Car deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      // If deleting fails, set an error message
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete car.');
      setSuccessMessage('');
    } finally {
      // Stop the loading state once the deletion is complete
      setLoading(false);
    }
  };

  // Return all state and functions for use in the component
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
