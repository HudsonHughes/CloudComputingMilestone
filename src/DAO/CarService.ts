import { firestore } from '../DAO/firestore';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';

interface Car {
  id: string;
  color: string;
  make: string;
  mileage: string;
  model: string;
  price: number;
  imageUrl: string;
}

class CarService {
  private carsCollection;

  constructor() {
    // Initialize the Firestore collection reference for 'cars'
    this.carsCollection = collection(firestore, 'cars');
  }

  /**
   * Fetches all cars from the 'cars' Firestore collection.
   * Maps the Firestore documents into an array of Car objects.
   * @returns {Promise<Car[]>} - Array of cars with their respective data.
   */
  async getAllCars() {
    const carCollection = collection(firestore, 'cars');
    const carSnapshot = await getDocs(carCollection);  // Fetch all documents from the 'cars' collection
    const cars = carSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,           // Use Firestore document ID as the car ID
        color: data.color,    // Map the rest of the fields to the car object
        make: data.make,
        mileage: data.mileage,
        model: data.model,
        price: data.price,
        imageUrl: data.imageUrl,
      } as Car;
    });
    return cars;
  }

  /**
   * Fetches a specific car by its ID from the Firestore collection.
   * @param {string} id - The ID of the car to fetch.
   * @returns {Promise<Car>} - The car object with the fetched data.
   * @throws Will throw an error if the car is not found.
   */
  async getCarById(id: string) {
    const docRef = doc(firestore, 'cars', id);  // Reference the specific car document by ID
    const carDoc = await getDoc(docRef);        // Fetch the document

    if (carDoc.exists()) {
      const carData = carDoc.data() as Car;
      return {
        ...carData,  // Spread the fields from the document data
        id: carDoc.id,  // Include the document ID as the car ID
      };
    } else {
      throw new Error('Car not found');  // Throw an error if the car doesn't exist
    }
  }

  /**
   * Adds a new car to the 'cars' Firestore collection.
   * @param {Object} carData - The data of the car to add (color, make, mileage, model, price, imageUrl).
   * @returns {Promise<string>} - The ID of the newly added car.
   * @throws Will throw an error if the car could not be added.
   */
  async addCar(carData: { color: string; make: string; mileage: string; model: string; price: number; imageUrl: string }) {
    try {
      const carRef = await addDoc(this.carsCollection, carData);  // Add a new document with the car data
      return carRef.id;  // Return the newly created document ID
    } catch (error) {
      console.error('Error adding car: ', error);  // Log the error for debugging
      throw error;  // Re-throw the error so it can be handled elsewhere
    }
  }

  /**
   * Updates an existing car in the 'cars' Firestore collection by ID.
   * @param {string} id - The ID of the car to update.
   * @param {Object} carData - The new data to update the car with.
   * @returns {Promise<string>} - The ID of the updated car.
   * @throws Will throw an error if the car could not be updated.
   */
  async updateCar(id: string, carData: { color: string; make: string; mileage: string; model: string; price: number; imageUrl: string }) {
    try {
      const carDocRef = doc(firestore, 'cars', id);  // Reference the car document by ID
      await updateDoc(carDocRef, carData);  // Update the document with the new data
      return id;  // Return the ID of the updated car
    } catch (error) {
      console.error('Error updating car: ', error);  // Log the error for debugging
      throw error;  // Re-throw the error so it can be handled elsewhere
    }
  }

  /**
   * Deletes a car from the 'cars' Firestore collection by ID.
   * @param {string} id - The ID of the car to delete.
   * @returns {Promise<string>} - The ID of the deleted car.
   * @throws Will throw an error if the car could not be deleted.
   */
  async deleteCar(id: string) {
    try {
      const carDocRef = doc(firestore, 'cars', id);  // Reference the car document by ID
      await deleteDoc(carDocRef);  // Delete the document
      return id;  // Return the ID of the deleted car
    } catch (error) {
      console.error('Error deleting car: ', error);  // Log the error for debugging
      throw error;  // Re-throw the error so it can be handled elsewhere
    }
  }
}

// Export an instance of CarService for use in the application
export const carService = new CarService();
