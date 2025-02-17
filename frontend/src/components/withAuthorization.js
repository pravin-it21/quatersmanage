import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthorization = (WrappedComponent, allowedRole) => {
  return class extends React.Component {
    render() {
      const user = JSON.parse(localStorage.getItem('user'));
      const role = user ? user.user.role : null;

      if (role === allowedRole) {
        return <WrappedComponent {...this.props} />;
      } else {
        // Redirect to login page or an unauthorized page
        return <Redirect to='/login' />;
      }
    }
  };
};

export default withAuthorization;
