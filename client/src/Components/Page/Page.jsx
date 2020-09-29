import React, { useContext } from 'react';
import AppContext from '../../Contexts/AppContext';
import './Page.css';

export default function ({ children }) {
  return <article className={'page'}>{children}</article>;
}
