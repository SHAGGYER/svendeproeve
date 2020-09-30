import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HttpClient from '../../../Services/HttpClient';
import Page from '../../../Components/Page/Page';

export default function () {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    getAbouts();
  }, []);

  const getAbouts = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/abouts',
    );
    setAbouts(data);
    console.log(data);
  };

  return (
    <Page>
      <div className="p-4" id="about">
        <div className="flex flex-wrap justify-between items-start">
          {abouts.map((about, index) => (
            <div key={index} className="mr-4 w-full md:w-64">
              <h3 className="text-3xl text-blue-700 mb-2">{about.title}</h3>
              <p className="text-sm text-gray-600">{about.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
