import React, { useEffect, useState } from 'react';
import AdminPage from '../../../Components/AdminPage/AdminPage';
import HttpClient from '../../../Services/HttpClient';
import Button from '../../../Components/Button/Button';
import { useHistory } from 'react-router-dom';

export default function () {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const _errors = [];

    if (!title.trim()) _errors.push('Titel er påkrævet');
    if (!content.trim()) _errors.push('Indhold er påkrævet');

    if (_errors.length) return setErrors(_errors);

    const data = {
      title,
      content,
    };

    await HttpClient().post('http://localhost:4000/api/v1/abouts', data);
    history.push('/admin/abouts');
  };

  return (
    <AdminPage>
      <h1 className="text-3xl mb-4">Opret Om</h1>

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
