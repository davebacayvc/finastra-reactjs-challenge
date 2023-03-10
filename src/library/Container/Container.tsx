import React from "react";
import "./Container.scss";

type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  isVisible?: boolean;
};

const Container: React.FC<ContainerProps> = (props) => {
  if (props.isVisible) return <div className="container">{props.children}</div>;

  return <React.Fragment />;
};

Container.defaultProps = {
  isVisible: true,
};

export default Container;
