import React from 'react';
import HttpClient from './Services/HttpClient';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import AppContext from './Contexts/AppContext';
import Install from './Pages/Install/Install';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home/Home';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import PetDetails from './Pages/PetDetails/PetDetails';
import CreateAdopt from './Pages/Admin/Adopts/CreateAdopt';
import CreateAbout from './Pages/Admin/Abouts/CreateAbout';
import BrowseAbouts from './Pages/Admin/Abouts/BrowseAbouts';
import EditAbout from './Pages/Admin/Abouts/EditAbout';
import Admin from './Pages/Admin/Admin';
import CreateVolunteer from './Pages/Admin/Volunteers/CreateVolunteer';
import EditVolunteer from './Pages/Admin/Volunteers/EditVolunteer';
import BrowseVolunteers from './Pages/Admin/Volunteers/BrowseVolunteers';

function App({ location }) {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [initiated, setInitiated] = useState(false);
  const [installed, setInstalled] = useState(false);

  let desktopQuery = window.matchMedia('(max-width: 600px)');
  const [mobileMatches, setMobileMatches] = useState(desktopQuery.matches);

  const watchDesktop = () => {
    if (!desktopQuery.matches) {
      setMobileMatches(false);
    } else {
      setMobileMatches(true);
    }
  };
  desktopQuery.addListener(watchDesktop);

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname.includes('admin')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setUserId(localStorage.getItem('userId'));
    setInitiated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId(null);
    window.location = '/auth/login';
  };

  const showNotification = (text, type) => {
    store.addNotification({
      title: 'Notifikation',
      message: text,
      type: type,
      insert: 'top',
      container: 'bottom-left',
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  return (
    <>
      <ReactNotification />
      {initiated && (
        <section>
          <AppContext.Provider
            value={{
              mobileMatches,
              setMobileMatches,
              token,
              setToken,
              isAdmin,
              setIsAdmin,
              userId,
              setUserId,
              logout,
              showNotification,
            }}
          >
            {userId && isAdmin ? <Sidebar /> : <Navbar />}

            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>

              <Route path="/pet/:id">
                <PetDetails />
              </Route>

              <Route path="/admin" exact>
                {userId ? <Admin /> : <Redirect to="/auth/login" />}
              </Route>

              <Route path="/admin/adopt/create">
                {userId ? <CreateAdopt /> : <Redirect to="/auth/login" />}
              </Route>

              <Route path="/admin/abouts/create">
                {userId ? <CreateAbout /> : <Redirect to="/auth/login" />}
              </Route>
              <Route path="/admin/abouts/:id">
                {userId ? <EditAbout /> : <Redirect to="/auth/login" />}
              </Route>
              <Route path="/admin/abouts" exact>
                {userId ? <BrowseAbouts /> : <Redirect to="/auth/login" />}
              </Route>

              <Route path="/admin/volunteers/create">
                {userId ? <CreateVolunteer /> : <Redirect to="/auth/login" />}
              </Route>
              <Route path="/admin/volunteers/:id">
                {userId ? <EditVolunteer /> : <Redirect to="/auth/login" />}
              </Route>
              <Route path="/admin/volunteers" exact>
                {userId ? <BrowseVolunteers /> : <Redirect to="/auth/login" />}
              </Route>

              <Route path="/auth/login">
                {!userId ? <Login /> : <Redirect to="/admin" />}
              </Route>
            </Switch>
          </AppContext.Provider>
        </section>
      )}
    </>
  );
}

export default withRouter(App);