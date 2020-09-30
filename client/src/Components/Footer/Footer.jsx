import React from 'react';
import Page from '../Page/Page';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <article className="bg-indigo-200 p-4">
      <Page>
        <div className="flex justify-between">
          <div>
            <h3 className="uppercase text-lg">kontakt</h3>
            <p className="text-sm">Torkebuskvej 123</p>
            <p className="text-sm">1131 København K</p>
            <p className="text-sm">CVR: 12345678</p>
            <p className="text-sm">
              Husk du kan få fradrag på donation på op til 16.600kr
            </p>
          </div>
          <div>
            <h3 className="uppercase text-lg">partnere</h3>
            <p className="text-sm">
              <a href="#" className="text-blue-500 no-underline">
                Anima
              </a>
            </p>
            <p className="text-sm">
              <a href="#" className="text-blue-500 no-underline">
                World Animal Protection
              </a>
            </p>
            <p className="text-sm">
              <a href="#" className="text-blue-500 no-underline">
                Fødevarestyrelsen
              </a>
            </p>
            <p className="text-sm">
              <a href="#" className="text-blue-500 no-underline">
                Faktalink
              </a>
            </p>
          </div>
        </div>
        <div className="mt-4 text-center">
          &copy; 2020 - Foreningen for Dyrevelfærd
        </div>
        <div className="text-center">
          <Link to={'/unsubscribe'} className="underline">
            Afmeld Nyhedsbrev
          </Link>
        </div>
      </Page>
    </article>
  );
}
