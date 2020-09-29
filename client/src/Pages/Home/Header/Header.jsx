import React from 'react';
import Kittens from '../../../Images/header/kittens.jpg';
import Page from '../../../Components/Page/Page';

export default function () {
  return (
    <article>
      <div
        style={{ background: `url(${Kittens}) center center / cover` }}
        className="h-64 w-full"
      >
        <Page>
          <div className="pt-8">
            <h1 className="text-white text-4xl font-bold">
              Foreningen for Dyrevelfærd
            </h1>
            <h4 className="text-white">Vi specialiserer os i dyrevelfærd</h4>
          </div>
        </Page>
      </div>
    </article>
  );
}
