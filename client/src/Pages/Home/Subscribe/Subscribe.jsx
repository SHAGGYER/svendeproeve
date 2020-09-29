import React, { useContext, useState } from 'react';
import Page from '../../../Components/Page/Page';
import AppContext from '../../../Contexts/AppContext';
import validator from 'validator';
import HttpClient from '../../../Services/HttpClient';

export default function () {
  const { showNotification } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});
    const _error = {};
    if (!validator.isEmail(email))
      _error.email = 'Email skal være i korrekt format';
    if (!name.trim()) _error.name = 'Navn er påkrævet';
    if (Object.keys(_error).length) return setError(_error);

    const alreadySubscribed = await HttpClient().get(
      'http://localhost:4000/api/v1/subscribers',
    );
    alreadySubscribed.data.forEach((sub) => {
      if (sub.email === email) {
        return setError({ email: 'Du er allerede tilmeldt!' });
      }
    });

    const data = {
      name,
      email,
    };

    await HttpClient().post('http://localhost:4000/api/v1/subscribers', data);
    showNotification('Du er nu tilmeldt!', 'success');
  };

  return (
    <article className="bg-indigo-200 pt-4 pb-16">
      <Page>
        <h2 className="text-blue-700 text-2xl mb-6">
          Tilmeld vores nyhedsbrev
        </h2>
        <div className="flex justify-between">
          <h3>
            Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i
            din indbakke.
          </h3>

          <form onSubmit={onSubmit}>
            <div className="flex">
              <div className="mr-4">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded px-2 py-1 border w-48 border-gray-300"
                  placeholder="Email"
                />
                {error.email && (
                  <p className="text-red-600 uppercase text-xs">
                    {error.email}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="rounded px-2 py-1 border w-48 border-gray-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Navn"
                />
                {error.name && (
                  <p className="text-red-600 uppercase text-xs">{error.name}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-blue-700 text-white text-sm rounded px-2 py-1">
                Tilmeld
              </button>
            </div>
          </form>
        </div>
      </Page>
    </article>
  );
}
