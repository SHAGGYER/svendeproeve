import React, { useEffect, useState } from 'react';
import AdminPage from '../../../Components/AdminPage/AdminPage';
import HttpClient from '../../../Services/HttpClient';
import { Link } from 'react-router-dom';

export default function () {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources();
  }, []);

  const getResources = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/animals',
    );
    setResources(data);
  };

  return (
    <AdminPage>
      <div className="flex flex-wrap">
        {resources.map((resource, index) => (
          <div className="p-4 text-center border border-gray-300 m-1 w-40">
            <h3 className="mb-4">{resource.name}</h3>
            <Link
              to={`/admin/animals/${resource.id}`}
              className="bg-blue-700 text-white p-2 rounded"
            >
              Se
            </Link>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
