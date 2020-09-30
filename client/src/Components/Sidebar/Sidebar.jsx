import React, { useContext } from 'react';
import AppContext from '../../Contexts/AppContext';
import Logo from '../../Images/logo.png';
import SidebarLink from './SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';

export default function () {
  const { logout } = useContext(AppContext);

  const adoptItems = [
    {
      title: 'Alle Adoption',
      to: '/admin/adopts',
    },
    {
      title: 'Opret Adoption',
      to: '/admin/adopts/create',
    },
  ];

  const aboutItems = [
    {
      title: 'Alle Om',
      to: '/admin/abouts',
    },
    {
      title: 'Opret Om',
      to: '/admin/abouts/create',
    },
  ];

  const animalItems = [
    {
      title: 'Alle Dyre',
      to: '/admin/animals',
    },
    {
      title: 'Opret Dyr',
      to: '/admin/animals/create',
    },
  ];

  const volunteerItems = [
    {
      title: 'Alle Frivillige',
      to: '/admin/volunteers',
    },
    {
      title: 'Opret Frivillig',
      to: '/admin/volunteers/create',
    },
  ];

  const assetsItems = [
    {
      title: 'Alle Assets',
      to: '/admin/assets',
    },
    {
      title: 'Opret Asset',
      to: '/admin/assets/create',
    },
  ];

  const subscriberItems = [
    {
      title: 'Alle Subscribere',
      to: '/admin/subscribers',
    },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-600 flex flex-col">
      <div className="flex justify-center p-4">
        <img src={Logo} className="h-24" />
      </div>
      <article className="flex-grow h-0 overflow-y-auto px-4">
        <SidebarLink
          to="/admin"
          title="Dashboard"
          icon={<i className="fas fa-tachometer-alt"></i>}
        />
        <SidebarSubmenu
          items={adoptItems}
          title="Adoptioner"
          icon={<i className="fas fa-th"></i>}
        />
        <SidebarSubmenu
          items={aboutItems}
          title="Om"
          icon={<i className="fas fa-th"></i>}
        />
        <SidebarSubmenu
          items={volunteerItems}
          title="Frivillige"
          icon={<i className="fas fa-th"></i>}
        />
        <SidebarSubmenu
          items={animalItems}
          title="Dyre"
          icon={<i className="fas fa-th"></i>}
        />
        <SidebarSubmenu
          items={assetsItems}
          title="Assets"
          icon={<i className="fas fa-th"></i>}
        />
        <SidebarSubmenu
          items={subscriberItems}
          title="Subscribere"
          icon={<i className="fas fa-th"></i>}
        />
      </article>
      <button
        onClick={logout}
        className="bg-purple-600 text-white py-4 hover:bg-pink-700"
      >
        Logout
      </button>
    </div>
  );
}
