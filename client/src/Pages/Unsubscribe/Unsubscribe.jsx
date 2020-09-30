import React, { useContext, useState } from 'react';
import Page from '../../Components/Page/Page';
import Input from '../../Components/Input/Input';
import HttpClient from '../../Services/HttpClient';
import AppContext from '../../Contexts/AppContext';
import Button from '../../Components/Button/Button';

export default function () {
  const { showNotification } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});
    if (!email.trim()) return setError({ email: 'Email er påkrævet' });

    try {
      await HttpClient().delete(
        'http://localhost:4000/api/v1/subscribers/' + email,
      );
      showNotification('Du er nu afmeldt', 'success');
    } catch (e) {
      showNotification('Noget gik galt', 'danger');
    }
  };

  return (
    <Page>
      <h1 className="text-3xl">Afmeld Nyhedsbrev</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <Input
            value={email}
            onChange={setEmail}
            label="Email"
            error={error.email}
          />
        </div>

        <Button className="bg-green-500 text-white" type="submit">
          Afmeld
        </Button>
      </form>
    </Page>
  );
}
