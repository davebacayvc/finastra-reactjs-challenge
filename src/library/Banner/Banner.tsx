import React from "react";
import "./Banner.scss";

type BannerProps = React.HTMLProps<HTMLDivElement> & {
  title: string;
  description: string;
};

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <div className="banner-container">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default Banner;
