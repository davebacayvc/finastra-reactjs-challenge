import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/routes";
import Spinner from "../Spinner/Spinner";
import "./Wrapper.scss";

type WrapperProps = {
  loading?: boolean;
  error?: boolean;
  children: React.ReactNode;
  className?: string;
};

const Wrapper: React.FC<WrapperProps> = (props) => {
  if (props.loading) {
    return <Spinner isVisible={true} />;
  }
  if (props.error) {
    return (
      <div className="erorr-404-container">
        <h1>INVALID</h1>
        <p>Error Occured</p>
        <Link to={PATHS.STUDENTS}>Go back to the home page</Link>
      </div>
    );
  }
  return (
    <div className={`"wrapper" ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
};

Wrapper.defaultProps = {
  error: false,
  loading: false,
};

export default Wrapper;
