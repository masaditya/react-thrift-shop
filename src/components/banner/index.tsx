import React from "react";

export const Banner = (props: { image: string; text?: string }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "70vh",
      }}
    >
      {props.text && <h1> {props.text} </h1>}
    </div>
  );
};
