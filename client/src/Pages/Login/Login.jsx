import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import HttpClient from '../../Services/HttpClient';

export default function () {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});
    const _error = {};

    if (!username.trim()) _error.username = 'Brugernavn er påkrævet';
    if (!password) _error.password = 'Kodeord er påkrævet';
    if (Object.keys(_error).length) return setError(_error);

    try {
      const data = {
        username,
        password,
      };

      setLoading(true);

      const response = await HttpClient().post(
        'http://localhost:4000/auth/token',
        data,
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      window.location = '/admin';
    } catch (error) {
      setLoading(false);
      setError({ general: error.response.data.message });
    }
  };

  return (
    <section className="mx-auto w-1/2 mt-10 shadow-lg p-4">
      <h1 className="text-3xl mb-4 text-center">Log Ind</h1>

      <form onSubmit={onSubmit}>
        {!!error.general && (
          <div className="px-4 py-2 bg-red-600 text-white mb-4">
            {error.general}
          </div>
        )}
        <div className="mb-4">
          <Input
            value={username}
            onChange={setUsername}
            label="Brugernavn"
            error={error.username}
          />
        </div>

        <div className="mb-4">
          <Input
            value={password}
            onChange={setPassword}
            label="Kodeord"
            error={error.password}
            type="password"
          />
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="submit"
            loading={loading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Log Ind
          </Button>

          <Link to="/auth/register" className="text-blue-700 hover:underline">
            Opret Bruger
          </Link>
        </div>
      </form>
    </section>
  );
}
