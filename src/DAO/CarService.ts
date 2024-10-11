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
    this.carsCollection = collection(firestore, 'cars');
  }

  async getAllCars() {
    const carCollection = collection(firestore, 'cars');
    const carSnapshot = await getDocs(carCollection);
    const cars = carSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,           // Use Firestore document ID as the car ID
        color: data.color,     // Map the rest of the fields
        make: data.make,
        mileage: data.mileage,
        model: data.model,
        price: data.price,
        imageUrl: data.imageUrl,
      } as Car;
    });
    return cars;
  }

  async getCarById(id: string) {
    const docRef = doc(firestore, 'cars', id);
    const carDoc = await getDoc(docRef);
  
    if (carDoc.exists()) {
      const carData = carDoc.data() as Car;
      return {
        ...carData,  // Spread the fields from the document data
        id: carDoc.id,
      };
    } else {
      throw new Error('Car not found');
    }
  }
  

  async addCar(carData: { color: string; make: string; mileage: string; model: string; price: number; imageUrl: string }) {
    try {
      const carRef = await addDoc(this.carsCollection, carData);
      return carRef.id;
    } catch (error) {
      console.error('Error adding car: ', error);
      throw error;
    }
  }

  async updateCar(id: string, carData: { color: string; make: string; mileage: string; model: string; price: number; imageUrl: string }) {
    try {
      const carDocRef = doc(firestore, 'cars', id);
      await updateDoc(carDocRef, carData);
      return id;
    } catch (error) {
      console.error('Error updating car: ', error);
      throw error;
    }
  }

  async deleteCar(id: string) {
    try {
      const carDocRef = doc(firestore, 'cars', id);
      await deleteDoc(carDocRef);
      return id;
    } catch (error) {
      console.error('Error deleting car: ', error);
      throw error;
    }
  }
}

export const carService = new CarService();
