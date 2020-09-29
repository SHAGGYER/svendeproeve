import React from 'react';
import Save from '../../../Images/help/save.jpg';
import Page from '../../../Components/Page/Page';

export default function () {
  return (
    <article id="help">
      <div
        style={{
          background: `url(${Save}) center center / cover`,
          height: 300,
        }}
      >
        <Page>
          <div className="pt-8">
            <h2 className="font-bold mb-4 text-4xl text-white uppercase">
              står du med et dyr i nød?
            </h2>
            <p className="text-white">
              Ring til Dyrenes Vagtcentral på 1812 og få råd til hjælp og
              håndtering af dyr
            </p>
          </div>
        </Page>
      </div>
    </article>
  );
}
