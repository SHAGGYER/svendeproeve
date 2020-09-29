import React from 'react';
import Save from '../../../Images/adopt/adopt.jpg';
import Page from '../../../Components/Page/Page';

export default function () {
  return (
    <article id="adopt">
      <div
        style={{
          background: `url(${Save}) center center / cover`,
          height: 300,
        }}
      >
        <Page>
          <div className="pt-8">
            <h2 className="font-bold mb-4 text-4xl text-white uppercase">
              adopter et dyr
            </h2>
            <p className="text-white">
              Overvejer du et nyd medlem af familien? Måske du er det perfekte
              match til et af vores mange svigtede internatdyr, som venter på
              nye kærlige hjem.
            </p>
          </div>
        </Page>
      </div>
    </article>
  );
}
