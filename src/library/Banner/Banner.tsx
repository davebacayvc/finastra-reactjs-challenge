import React from "react";
import "./Banner.scss";

type BannerProps = React.HTMLProps<HTMLDivElement> & {
  title: string;
  description: string;
  backConfigs?: {
    handler: () => void;
    isVisible: boolean;
    text: string;
  };
};

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <div className="banner-container">
      {props.backConfigs?.isVisible ? (
        <button onClick={props.backConfigs?.handler}>
          {props.backConfigs.text}
        </button>
      ) : null}
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default Banner;
