import React, { useEffect, useState } from 'react';
import AdminPage from '../../../Components/AdminPage/AdminPage';
import HttpClient from '../../../Services/HttpClient';

export default function () {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources();
  }, []);

  const getResources = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/subscribers',
    );
    setResources(data);
  };

  return (
    <AdminPage>
      <div className="flex flex-wrap">
        {resources.map((resource, index) => (
          <div key={index} className="p-2 border border-gray-300 m-1 w-full">
            <p className="mb-2">{resource.name}</p>
            <p className="mb-2">{resource.email}</p>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
