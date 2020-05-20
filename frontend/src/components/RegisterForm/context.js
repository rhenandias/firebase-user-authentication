import React from 'react';

const RegisterFormContext = React.createContext({
	loading: false,
	setLoading: () => {},
  });
  
export { RegisterFormContext };

