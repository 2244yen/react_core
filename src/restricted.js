import React from 'react';
// import { withRouter } from 'react-router-dom';
import apiAuth from './services/auth';

export default function(BaseComponent){
  // It creates a new wrapper component...
  class Restricted extends React.Component {
    componentWillMount () {
      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    checkAuthentication (params) {
      const { history } = params;
      if (!apiAuth.isLoggedIn()) {
        history.replace({ pathname: '/login' });
      }
    }
    
    render() {
      return <BaseComponent {...this.props} />;
    }
  }
  // Remember: it takes a component and returns a new component
  // Gotta return it here.
  return Restricted;
}
