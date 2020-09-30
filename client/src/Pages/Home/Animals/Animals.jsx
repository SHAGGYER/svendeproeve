import React, { useEffect, useState } from 'react';
import Page from '../../../Components/Page/Page';
import HttpClient from '../../../Services/HttpClient';
import { useHistory } from 'react-router-dom';

const PETS_PER_CLICK = 8;

export default function () {
  const history = useHistory();
  const [animals, setAnimals] = useState([]);
  const [showingAll, setShowingAll] = useState(false);
  const [currentAmountShowing, setCurrentAmountShowing] = useState(8);
  const [currentAnimals, setCurrentAnimals] = useState([]);

  useEffect(() => {
    getAnimals();
  }, []);

  const getAnimals = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/animals',
    );
    setAnimals(data);
    setCurrentAnimals(
      data.filter((animal, index) => index < currentAmountShowing),
    );
  };

  const showMore = () => {
    setCurrentAnimals(
      animals.filter(
        (animal, index) => index < currentAmountShowing + PETS_PER_CLICK,
      ),
    );
    setCurrentAmountShowing(currentAmountShowing + PETS_PER_CLICK);
  };

  return (
    <Page>
      <div className="p-2 pt-8">
        <h2 className="text-4xl text-blue-700">Dyr hos os</h2>
        <p className="mb-4">{animals.length} dyr</p>

        <div className="flex justify-between flex-wrap">
          {currentAnimals.map((animal, index) => (
            <div className="w-full md:w-1/2 mb-4" key={index}>
              <div
                className="flex flex-col md:flex-row rounded border border-gray-300 md:mr-4 md:h-full cursor-pointer"
                onClick={() => history.push(`/pet/${animal.id}`)}
              >
                <img src={animal.asset.url} className="w-full md:w-48 h-full" />
                <div className="p-2">
                  <h3 className="mb-4">{animal.name}</h3>

                  <p className="text-sm mb-4">{animal.description}</p>

                  <p className="text-xs text-gray-600">
                    Været på internattet i {animal.age} dage
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="ml-4 px-2 text-xs py-1 rounded bg-blue-700 text-white mb-4"
            onClick={() => showMore()}
          >
            Vis flere
          </button>
        </div>
      </div>
    </Page>
  );
}
