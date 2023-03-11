import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./Spinner.scss";

type SpinnerProps = {
  isVisible?: boolean;
};
const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <div className="spinner-container">
      <FaSpinner className="spinner" />
    </div>
  );
};

Spinner.defaultProps = {
  isVisible: false,
};

export default Spinner;
