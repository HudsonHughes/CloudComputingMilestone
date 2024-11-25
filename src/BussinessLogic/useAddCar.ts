import { useState } from "react";
import { carService } from "../DAO/CarService";

interface CarData {
  color: string;
  make: string;
  mileage: string;
  model: string;
  price: number;
  imageUrl: string;
}

const useAddCar = () => {
  window.logger.loggly.push("Initializing useAddCar");

  const logToServer = async (message: string) => {
    // Explicitly define the type of message
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

  // State to hold the car data input by the user
  const [carData, setCarData] = useState<CarData>({
    color: "",
    make: "",
    mileage: "",
    model: "",
    price: 0,
    imageUrl: "",
  });

  // State to indicate if the form is being submitted
  const [loading, setLoading] = useState(false);

  // State to hold any error message when form submission fails
  const [errorMessage, setErrorMessage] = useState("");

  // State to hold the success message after the form is successfully submitted
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Updates the carData state when the user types in the form fields.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by user input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Entering handleChange");
    logToServer("Entering handleChange");

    // Update the corresponding field in the carData object
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
    console.log("Updated carData state:", carData);
    console.log("Exiting handleChange");
  };

  /**
   * Handles form submission, sending the car data to the server and managing feedback.
   * @param {React.FormEvent<HTMLFormElement>} e - The event triggered by form submission.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Entering handleSubmit");
    // Prevents the default form behavior (like refreshing the page)
    e.preventDefault();

    // Set loading to true to indicate that the submission is in progress
    setLoading(true);

    try {
      console.log("Attempting to call carService.addCar with data:", carData);
      // Attempt to add a new car using the carService
      await carService.addCar(carData);

      // On success, show success message and clear the form fields
      console.log("Car added successfully");
      setSuccessMessage("Car added successfully!");
      setErrorMessage("");
      setCarData({
        color: "",
        make: "",
        mileage: "",
        model: "",
        price: 0,
        imageUrl: "",
      });
    } catch (error) {
      // On failure, show an error message
      const errorMsg =
        error instanceof Error ? error.message : "Failed to add car.";
      console.error("Error in handleSubmit:", errorMsg);
      setErrorMessage(errorMsg);
      setSuccessMessage("");
    } finally {
      // After the try/catch, set loading to false whether the submission was successful or not
      setLoading(false);
      console.log("Exiting handleSubmit");
    }
  };

  console.log("Returning from useAddCar");

  // Return the necessary state and functions for use in the component
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
