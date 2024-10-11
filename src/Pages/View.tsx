import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firestore';
import { Link } from 'react-router-dom';

const View: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'cars'));
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Car Listings</h1>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Make</th>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Mileage</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((car) => (
            <tr key={car.id} className="border-t">
              <td className="px-4 py-2">
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="w-32 h-32 object-cover"
                />
              </td>
              <td className="px-4 py-2">{car.color}</td>
              <td className="px-4 py-2">{car.make}</td>
              <td className="px-4 py-2">{car.model}</td>
              <td className="px-4 py-2">{car.mileage}</td>
              <td className="px-4 py-2">{car.price}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/edit/${car.id}`}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
