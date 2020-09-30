import React from 'react';
import { Slide } from 'react-slideshow-image';

import Animal1 from '../../../Images/animals/amina.jpg';
import Animal2 from '../../../Images/animals/carla.jpg';
import Animal3 from '../../../Images/animals/flotfyr.jpeg';
import Animal4 from '../../../Images/animals/frida.jpeg';
import Animal5 from '../../../Images/animals/pava.jpeg';
import Animal6 from '../../../Images/animals/pia.jpg';
import Animal7 from '../../../Images/animals/tristan.jpg';
import Page from '../../../Components/Page/Page';

const animals = [Animal1, Animal2, Animal3, Animal4, Animal5, Animal6, Animal7];

export default function () {
  return (
    <section>
      <Page>
        <Slide>
          {animals.map((animal, index) => (
            <img src={animal} key={index} className="w-full h-full" />
          ))}
        </Slide>
      </Page>
    </section>
  );
}
