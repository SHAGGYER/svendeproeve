import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HttpClient from '../../Services/HttpClient';
import Page from '../../Components/Page/Page';
import Footer from '../../Components/Footer/Footer';

export default function () {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    getAnimal();
  }, [id]);

  const getAnimal = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/animals/' + id,
    );
    setAnimal(data);
    console.log(data);
  };

  return (
    <>
      <Page>
        <h1 className="text-4xl mb-8">Dyr Detaljer</h1>

        <div className="mb-8">
          {animal && (
            <div>
              <img src={animal.asset.url} className="w-64 h-64 mb-4" />

              <h3 className="mb-4 text-3xl">{animal.name}</h3>

              <p className="text-sm mb-4">{animal.description}</p>

              <p className="text-xs text-gray-600">
                Været på internattet i 40 dage
              </p>
            </div>
          )}
        </div>
      </Page>
      <Footer />
    </>
  );
}
