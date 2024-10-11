import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  city: string;
  age: number;
}

const Edit: React.FC = () => {
  const [user, setUser] = useState<User>({ name: '', email: '', city: '', age: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setErrorMessage('No user ID provided');
        return;
      }

      try {
        const docRef = doc(firestore, 'users', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data() as User);
        } else {
          setErrorMessage('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setErrorMessage('Failed to fetch user data.');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!user.name || !user.email || !user.city || !user.age) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (!isValidEmail(user.email)) {
      setErrorMessage('Please enter a valid email.');
      return false;
    }
    if (isNaN(user.age) || user.age <= 0) {
      setErrorMessage('Please enter a valid age.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!id) {
      setErrorMessage('No user ID available');
      return;
    }

    try {
      const docRef = doc(firestore, 'users', id);
      await updateDoc(docRef, {
        name: user.name,
        email: user.email,
        city: user.city,
        age: Number(user.age), // Ensure age is a number
      });

      setSuccessMessage('User updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating document: ', error);
      setErrorMessage('Failed to update user. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleDelete = async () => {
    if (!id) {
      setErrorMessage('No user ID available');
      return;
    }

    try {
      const docRef = doc(firestore, 'users', id);
      await deleteDoc(docRef);

      setSuccessMessage('User deleted successfully!');
      setErrorMessage('');
      navigate('/view');
    } catch (error) {
      console.error('Error deleting document: ', error);
      setErrorMessage('Failed to delete user. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Edit User
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-black">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={user.name}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={user.email}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-black">
              City
            </label>
            <div className="mt-2">
              <input
                id="city"
                name="city"
                type="text"
                required
                value={user.city}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium leading-6 text-black">
              Age
            </label>
            <div className="mt-2">
              <input
                id="age"
                name="age"
                type="number"
                required
                value={user.age}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update User
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
