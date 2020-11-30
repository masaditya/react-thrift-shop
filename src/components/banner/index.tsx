import React from "react";

export const Banner = (props: {
  image: string;
  text?: string;
  subtitle?: string;
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "multiply",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "70vh",
        display: "flex",
      }}
    >
      <div style={{ margin: "auto", textAlign: "center" }}>
        {props.text && (
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "4em",
              fontWeight: "bold",
            }}
          >
            {props.text}
          </h1>
        )}
        {props.subtitle && (
          <h1 style={{ color: "#FFFFFF", fontSize: "2em" }}>
            {props.subtitle}
          </h1>
        )}
      </div>
    </div>
  );
};
