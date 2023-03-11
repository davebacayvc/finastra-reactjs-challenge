import React from "react";
import Spinner from "../Spinner/Spinner";
import "./Wrapper.scss";

type WrapperProps = {
  loading?: boolean;
  error?: boolean;
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = (props) => {
  if (props.loading) {
    return <Spinner isVisible={true} />;
  }
  return <div className="wrapper">{props.children}</div>;
};

Wrapper.defaultProps = {
  error: false,
  loading: false,
};

export default Wrapper;
