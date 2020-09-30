import React, { useContext, useEffect, useState } from 'react';
import AdminPage from '../../../Components/AdminPage/AdminPage';
import HttpClient from '../../../Services/HttpClient';
import Button from '../../../Components/Button/Button';
import { useHistory } from 'react-router-dom';
import AppContext from '../../../Contexts/AppContext';

export default function () {
  const { logout } = useContext(AppContext);
  const history = useHistory();
  const [assets, setAssets] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [extra, setExtra] = useState('');
  const [errors, setErrors] = useState([]);
  const [activeAsset, setActiveAsset] = useState(null);

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/assets',
    );
    setAssets(data);
    console.log(data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const _errors = [];

    if (!title.trim()) _errors.push('Titel er påkrævet');
    if (!content.trim()) _errors.push('Indhold er påkrævet');
    if (!activeAsset) _errors.push('Du skal vælge et billede');

    if (_errors.length) return setErrors(_errors);

    const data = {
      title,
      content,
      assetId: activeAsset,
      extra,
    };

    try {
      await HttpClient().post('http://localhost:4000/api/v1/volunteers', data);
      history.push('/admin/volunteers');
    } catch (e) {
      const { status } = e.response;
      if (status === 403 || status === 500) {
        logout();
      }
    }
  };

  return (
    <AdminPage>
      <h1 className="text-3xl mb-4">Opret Frivillig</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full p-2 border border-gray-300 h-64 resize-none"
          />
        </div>
        <div className="mb-4">
          <input
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder="Ekstra"
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

        <Button className="bg-green-500 text-white">Opret</Button>
      </form>
    </AdminPage>
  );
}
