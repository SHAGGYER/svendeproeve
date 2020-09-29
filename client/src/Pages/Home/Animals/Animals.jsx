import React, { useEffect, useState } from 'react';
import Page from '../../../Components/Page/Page';
import HttpClient from '../../../Services/HttpClient';
import { useHistory } from 'react-router-dom';

export default function () {
  const history = useHistory();
  const [animals, setAnimals] = useState([]);
  const [eightAnimals, setEightAnimals] = useState([]);
  const [showingAll, setShowingAll] = useState(false);

  useEffect(() => {
    getAnimals();
  }, []);

  const getAnimals = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/animals',
    );
    console.log(data);
    setAnimals(data);
    setEightAnimals(data.filter((animal, index) => index < 8));
  };

  return (
    <Page>
      <div className="pt-8">
        <h2 className="text-4xl text-blue-700">Dyr hos os</h2>
        <p className="mb-4">
          {animals.length} dyr
          <button
            className="ml-4 px-2 text-xs py-1 rounded bg-blue-700 text-white"
            onClick={() => setShowingAll(!showingAll)}
          >
            Vis {showingAll ? 'få' : 'alle'}
          </button>
        </p>

        <div className="flex justify-between flex-wrap">
          {animals
            .filter((animal, index) => (!showingAll ? index < 8 : true))
            .map((animal, index) => (
              <div className="w-1/2 mb-4" key={index}>
                <div
                  className="flex rounded border border-gray-300 mr-4 h-full cursor-pointer"
                  onClick={() => history.push(`/pet/${animal.id}`)}
                >
                  <img src={animal.asset.url} className="w-48 h-full" />
                  <div className="p-2">
                    <h3 className="mb-4">{animal.name}</h3>

                    <p className="text-sm mb-4">{animal.description}</p>

                    <p className="text-xs text-gray-600">
                      Været på internattet i 40 dage
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Page>
  );
}
