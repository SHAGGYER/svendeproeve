import React from 'react';
import Page from '../../Components/Page/Page';
import About from './About/About';
import Header from './Header/Header';
import Volunteers from './Volunteers/Volunteers';
import BannerSave from './BannerSave/BannerSave';
import BannerAdopt from './BannerAdopt/BannerAdopt';
import Subscribe from './Subscribe/Subscribe';
import Animals from './Animals/Animals';
import Footer from '../../Components/Footer/Footer';

export default function () {
  return (
    <section>
      <Header />
      <About />
      <Volunteers />
      <BannerSave />
      <Subscribe />
      <BannerAdopt />
      <Animals />
      <Footer />
    </section>
  );
}
