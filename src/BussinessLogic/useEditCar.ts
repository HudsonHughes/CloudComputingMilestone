import { useEffect, useState } from "react";
import { carService } from "../DAO/CarService";

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
  console.log("Car ID: " + id);
  // Function to log messages to the server
  const logToServer = async (message: string) => {
    try {
      await fetch("/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error("Failed to send log to server", error);
    }
  };

  // State to hold the car data being edited
  const [car, setCar] = useState<Car | null>(null);

  // State to indicate if the data is being loaded
  const [loading, setLoading] = useState(true);

  // State to store any error messages if fetching, updating, or deleting fails
  const [errorMessage, setErrorMessage] = useState("");

  // State to store a success message when the car is successfully updated or deleted
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Fetches the car data by its ID when the component mounts or when the ID changes.
   */
  useEffect(() => {
    logToServer(`Fetching car data for ID: ${id}`);

    const fetchCar = async () => {
      try {
        const fetchedCar = await carService.getCarById(id);
        setCar(fetchedCar);
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Failed to fetch car data.";
        setErrorMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    };

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
        [e.target.name]: e.target.value,
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
        await carService.updateCar(id, car);
        setSuccessMessage("Car updated successfully!");
        setErrorMessage("");
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Failed to update car.";
        setErrorMessage(errorMsg);
        setSuccessMessage("");
      } finally {
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
      await carService.deleteCar(id);
      setSuccessMessage("Car deleted successfully!");
      setErrorMessage("");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to delete car.";
      setErrorMessage(errorMsg);
      setSuccessMessage("");
    } finally {
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
    successMessage,
  };
};

export default useEditCar;
