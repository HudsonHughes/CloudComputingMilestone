import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/firestore';

interface User {
  name: string;
  email: string;
  city: string;
  age: number;
}

const Add: React.FC = () => {
  const [user, setUser] = useState<User>({ name: '', email: '', city: '', age: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

    try {
      await addDoc(collection(firestore, 'users'), {
        name: user.name,
        email: user.email,
        city: user.city,
        age: Number(user.age), // Ensure age is a number
      });

      setSuccessMessage('User created successfully!');
      setErrorMessage('');
      setUser({ name: '', email: '', city: '', age: 0 });
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorMessage('Failed to create user. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Add New User
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
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
