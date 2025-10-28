import * as React from "react";

type Props = {
  showcaseAnimation: React.ReactNode;
};

const ShowcaseAnimation: React.FC<Props> = (props: Props) => {
  return <div>{props.showcaseAnimation}</div>;
};

export default ShowcaseAnimation;
