import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { adminroutes, configroutes, privateroutes } from './config/routes';
import NavigationBar from './components/NavigationBar';
import PrivateRoute from './components/PrivateRoute';
import ChatBox from './components/ChatBox';
import { useSelector } from 'react-redux';

function App() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  // ROUTING
  const CR = configroutes.map(({ path, component, exact }, key) =>
    <Route
      exact={exact}
      path={path}
      component={component}
      key={key}
    />
  );
  const PR = privateroutes.map(({ path, component, exact }, key) =>
    <PrivateRoute
      exact={exact}
      path={path}
      component={component}
      key={key}
    />
  );

  const AR = adminroutes.map(({ path, component, exact }, key) =>
    <PrivateRoute
      exact={exact}
      path={path}
      component={component}
      key={key}
    />
  );

  return (
    <body>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          {PR}
          {CR}
          {AR}
        </Switch>
        <div className="row center">
          {
            userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />
          }{''}
        </div>
      </BrowserRouter>
    </body>
  );
}

export default App;
