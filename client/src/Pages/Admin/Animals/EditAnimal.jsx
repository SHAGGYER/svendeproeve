import React, { useContext, useEffect, useState } from 'react';
import AdminPage from '../../../Components/AdminPage/AdminPage';
import HttpClient from '../../../Services/HttpClient';
import Button from '../../../Components/Button/Button';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../../Contexts/AppContext';

export default function () {
  const { id } = useParams();
  const { logout } = useContext(AppContext);
  const history = useHistory();
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState([]);
  const [activeAsset, setActiveAsset] = useState(null);

  useEffect(() => {
    getResource();
  }, [id]);

  const getResource = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/animals/' + id,
    );
    setName(data.name);
    setDescription(data.description);
    setAge(data.age);
    setActiveAsset(data.asset.id);
  };

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/assets',
    );
    setAssets(data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const _errors = [];

    if (!name.trim()) _errors.push('Navn er påkrævet');
    if (!description.trim()) _errors.push('Beskrivelse er påkrævet');
    if (!age) _errors.push('Alder er påkrævet');
    if (!activeAsset) _errors.push('Du skal vælge et billede');

    if (_errors.length) return setErrors(_errors);

    try {
      const data = {
        name,
        description,
        age,
        assetId: activeAsset,
      };

      await HttpClient().put(
        'http://localhost:4000/api/v1/animals/' + id,
        data,
      );
      history.push('/admin/animals');
    } catch (e) {
      const { status } = e.response;
      if (status === 403 || status === 500) {
        logout();
      }
    }
  };

  const deleteResource = async () => {
    try {
      await HttpClient().delete('http://localhost:4000/api/v1/animals/' + id);
      history.push('/admin/animals');
    } catch (e) {
      const { status } = e.response;
      if (status === 403 || status === 500) {
        logout();
      }
    }
  };

  return (
    <AdminPage>
      <h1 className="text-3xl mb-4">Redigér Dyr</h1>

      <Button
        className="bg-red-600 text-white mb-4"
        onClick={() => deleteResource()}
      >
        Slet Dyr
      </Button>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Navn"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Content"
            className="w-full p-2 border border-gray-300 h-64 resize-none"
          />
        </div>
        <div className="mb-4">
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Alder"
            type="number"
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <h2 className="mb-4">Vælg Billede</h2>

        <div className="flex flex-wrap">
          {assets.map((asset, index) => (
            <div
              key={index}
              onClick={() => setActiveAsset(asset.id)}
              className={
                'border m-2 p-2 ' +
                (activeAsset === asset.id
                  ? 'border-blue-400'
                  : 'border-gray-300')
              }
            >
              <img src={asset.url} className="w-40 h-40" />
            </div>
          ))}
        </div>

        {!!errors.length && (
          <div className="bg-red-600 text-white mb-4 p-4">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {!!errors.length && (
          <div className="bg-red-600 text-white mb-4 p-4">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Button className="bg-green-500 text-white">Gem</Button>
      </form>
    </AdminPage>
  );
}
