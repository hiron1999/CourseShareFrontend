import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingAnimation.css'; // Assuming you have a CSS file for styles

const LoadingAnimation = ({ isLoading }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
      const timeoutId = setTimeout(() => setFadeOut(false), 2000); // Duration of the fade-out transition
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    (isLoading || fadeOut) && (
      <div className={`loading-wrapper ${!isLoading && fadeOut ? 'fade-out' : ''}`}>
        <h2>
          Loading...
          <span>
            <Spinner animation="border" role="status" />
          </span>
        </h2>
      </div>
    )
  );
};

export default LoadingAnimation;
