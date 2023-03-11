import React from "react";
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
    return <p>Error occured. Please try again later.</p>;
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
