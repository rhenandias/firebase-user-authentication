import React from 'react';

const LoginFormContext = React.createContext({
	loading: false,
	setLoading: () => {},
  });
  
export { LoginFormContext };

