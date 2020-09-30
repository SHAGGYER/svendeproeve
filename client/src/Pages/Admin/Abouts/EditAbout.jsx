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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getResource();
  }, [id]);

  const getResource = async () => {
    const { data } = await HttpClient().get(
      'http://localhost:4000/api/v1/abouts/' + id,
    );
    setTitle(data.title);
    setContent(data.content);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const _errors = [];

    if (!title.trim()) _errors.push('Titel er påkrævet');
    if (!content.trim()) _errors.push('Indhold er påkrævet');

    if (_errors.length) return setErrors(_errors);

    try {
      const data = {
        title,
        content,
      };

      await HttpClient().put('http://localhost:4000/api/v1/abouts/' + id, data);
      history.push('/admin/abouts');
    } catch (e) {
      const { status } = e.response;
      if (status === 403 || status === 500) {
        logout();
      }
    }
  };

  const deleteResource = async () => {
    try {
      await HttpClient().delete('http://localhost:4000/api/v1/abouts/' + id);
      history.push('/admin/abouts');
    } catch (e) {
      const { status } = e.response;
      if (status === 403 || status === 500) {
        logout();
      }
    }
  };

  return (
    <AdminPage>
      <h1 className="text-3xl mb-4">Redigér Om</h1>

      <Button
        className="bg-red-600 text-white mb-4"
        onClick={() => deleteResource()}
      >
        Slet Om
      </Button>

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

        <Button className="bg-green-500 text-white">Gem</Button>
      </form>
    </AdminPage>
  );
}
