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

const useCarList = () => {
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

  logToServer("Initializing useCarList");

  // State to store the list of cars fetched from the service
  const [cars, setCars] = useState<Car[]>([]);

  // State to indicate if the car list is being loaded
  const [loading, setLoading] = useState(true);

  // State to store any error messages during the fetch operation
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * useEffect to fetch the list of cars when the component mounts.
   * This only runs once, when the component is first rendered.
   */
  useEffect(() => {
    logToServer("Entering useEffect in useCarList");

    // Function to fetch cars from the service
    const fetchCars = async () => {
      logToServer("Entering fetchCars");
      try {
        logToServer("Fetching cars from carService...");
        // Try to fetch the cars from the service and update the state
        const fetchedCars = await carService.getAllCars();
        logToServer("Fetched cars: " + JSON.stringify(fetchedCars));
        setCars(fetchedCars);
      } catch (error) {
        // If an error occurs, set an error message
        const errorMsg =
          error instanceof Error ? error.message : "Failed to fetch car list.";
        console.error("Error while fetching cars:", errorMsg);
        setErrorMessage(errorMsg);
      } finally {
        // Set loading to false once the fetch operation completes
        setLoading(false);
        logToServer("Exiting fetchCars");
      }
    };

    // Call the fetchCars function to start the process
    fetchCars();

    logToServer("Exiting useEffect in useCarList");
  }, []); // Empty dependency array means this runs only once, when the component mounts

  logToServer("Returning from useCarList");

  // Return the cars, loading state, and any error messages for use in the component
  return { cars, loading, errorMessage };
};

export default useCarList;
