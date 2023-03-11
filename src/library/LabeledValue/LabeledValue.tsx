import React from "react";
import "./LabeledValue.scss";

type LabeledValueProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};
const LabeledValue: React.FC<LabeledValueProps> = (props) => {
  return (
    <div className="labeled-value">
      <span className="label">
        {props.icon} {props.label}:
      </span>
      <span className="value">{props.value}</span>
    </div>
  );
};

export default LabeledValue;
