import { firestore } from '../DAO/firestore';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';

class CarService {
  private carsCollection;

  constructor() {
    this.carsCollection = collection(firestore, 'cars');
  }

  async getAllCars() {
    try {
      const querySnapshot = await getDocs(this.carsCollection);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching cars: ', error);
      throw error;
    }
  }

  async getCarById(id: string) {
    const docRef = doc(firestore, 'cars', id);
    const carDoc = await getDoc(docRef);

    if (carDoc.exists()) {
      return carDoc.data(); // This should return the car data fields
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
