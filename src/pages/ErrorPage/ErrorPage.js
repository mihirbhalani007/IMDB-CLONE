import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation
import "./ErrorPage.css"; // Import CSS file for styling

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-heading">404 - Page Not Found</h1>
        <p className="error-message">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link to="/" className="home-button">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
