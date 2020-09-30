import React, { useEffect, useState } from 'react';
import Save from '../../../Images/adopt/adopt.jpg';
import Page from '../../../Components/Page/Page';
import HttpClient from '../../../Services/HttpClient';

export default function () {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    getResource();
  }, []);

  const getResource = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/adoptsections/3',
    );
    setResource(data);
  };

  return (
    <article id="adopt">
      {resource && (
        <>
          <div
            style={{
              background: `url(${resource.asset.url}) center center / cover`,
            }}
            className="h-64 w-full"
          >
            <Page>
              <div className="p-2 pt-8">
                <h1 className="text-white text-4xl font-bold">
                  {resource.title}
                </h1>
                <h4 className="text-white">{resource.content}</h4>
              </div>
            </Page>
          </div>
        </>
      )}
    </article>
  );
}
