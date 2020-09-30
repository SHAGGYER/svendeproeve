import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Page from '../../../Components/Page/Page';
import HttpClient from '../../../Services/HttpClient';

export default function () {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    getInfos();
  }, []);

  const getInfos = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/volunteers',
    );
    setInfos(data);
    console.log(data);
  };

  return (
    <div className="bg-indigo-200 p-4" id="volunteer">
      <Page>
        <h2 className="text-3xl mb-4 text-blue-700">Bliv Frivillig</h2>

        <div className="flex flex-wrap justify-between items-start">
          {infos.map((info, index) => (
            <div
              key={index}
              className="md:mr-4 mb-2 w-full flex flex-col md:w-64"
              style={{ height: 500 }}
            >
              <div className="bg-gray-100 px-2 py-1 border border-gray-300 text-black">
                {info.title}
              </div>
              <div className="bg-white p-2 flex-grow border border-gray-300 border-t-0 border-b-0">
                <img src={info.asset.url} className="w-full h-40 mb-2" />

                <p className="text-sm">{info.content}</p>
              </div>
              <div className="bg-gray-100 px-2 py-1 border border-gray-300">
                <p className="italic text-xs">{info.extra}</p>
              </div>
            </div>
          ))}
        </div>
      </Page>
    </div>
  );
}
