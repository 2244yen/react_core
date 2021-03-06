import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute ({component: Component, authed, ...rest}) {
  console.log(authed);
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
export default PrivateRoute;