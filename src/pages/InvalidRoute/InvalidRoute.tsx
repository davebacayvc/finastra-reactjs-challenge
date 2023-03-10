import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/routes";
import "./InvalidRoute.scss";

const InvalidRoute: React.FC = () => {
  return (
    <div className="erorr-404-container">
      <h1>ERROR 404</h1>
      <p>Page not found</p>
      <Link to={PATHS.STUDENTS}>Go back to the home page</Link>
    </div>
  );
};

export default InvalidRoute;
