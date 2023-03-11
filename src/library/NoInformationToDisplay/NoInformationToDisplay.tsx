import React from "react";

type NoInformationToDisplayProps = {
  text?: string;
  showNull: boolean;
  children?: React.ReactNode;
};
const NoInformationToDisplay: React.FC<NoInformationToDisplayProps> = (
  props
) => {
  if (props.showNull) {
    return <div>{props.text}</div>;
  }

  return <div>{props.children}</div>;
};

NoInformationToDisplay.defaultProps = {
  text: "No data found.",
  showNull: true,
};
export default NoInformationToDisplay;
