import React from "react";

const style = {
  "background": "transparent",
  "border": "none",
  "borderBottom": "1px solid #f6d18a",
  "color": "#eebbcd",
  "fontSize": "16px",
  "textAlign": "center"
};

const StyledTextView = (props) => <input style={style}
                                         type={"text"}
                                         { ...props } />;

export { StyledTextView };