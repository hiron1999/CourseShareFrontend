import React, { createContext, useState, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import LoadingAnimation from '../UI/LoadingAnimation';

// Create a Context for the loading state
const LoadingContext = createContext();

// Create a Provider component
const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <LoadingAnimation isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
