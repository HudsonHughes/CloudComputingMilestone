import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <Link to="/view" className="px-3 py-2 rounded hover:bg-gray-700">View Users</Link>
          <Link to="/add" className="ml-4 px-3 py-2 rounded hover:bg-gray-700">Add User</Link>
        </div>
        <div className="text-white">
          <Link to="/login" className="px-3 py-2 rounded hover:bg-gray-700">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
