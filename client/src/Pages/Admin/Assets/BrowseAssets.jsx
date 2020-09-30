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
      'http://localhost:4000/api/v1/assets',
    );
    setResources(data);
  };

  return (
    <AdminPage>
      <div className="flex flex-wrap">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="p-4 text-center border border-gray-300 m-1 w-40 h-40"
          >
            <img src={resource.url} className="w-full h-full" />
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
