import React, { useContext, useEffect, useState } from 'react';
import AdminPage from '../../../Components/AdminPage/AdminPage';
import HttpClient from '../../../Services/HttpClient';
import Button from '../../../Components/Button/Button';
import { useHistory } from 'react-router-dom';
import AppContext from '../../../Contexts/AppContext';

export default function () {
  const history = useHistory();
  const { logout } = useContext(AppContext);
  const [file, setFile] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const _errors = [];

    if (!file) _errors.push('Fil er påkrævet');

    if (_errors.length) return setErrors(_errors);

    try {
      const formData = new FormData();
      formData.append('file', file);

      await HttpClient().post('http://localhost:4000/api/v1/assets', formData);
      history.push('/admin/assets');
    } catch (e) {
      const { status } = e.response;
      if (status === 403 || status === 500) {
        logout();
      }
    }
  };

  function handleFileChange(file) {
    setFile(file);
  }

  return (
    <AdminPage>
      <h1 className="text-3xl mb-4">Opret Asset</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            onChange={(e) => handleFileChange(e.target.files[0])}
            placeholder="Fil"
            type="file"
            className="w-full p-2 border border-gray-300"
          />
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
