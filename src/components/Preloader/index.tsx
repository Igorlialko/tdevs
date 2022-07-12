import React from "react";

import st from "./index.module.scss";

const Preloader = () => {
  return (
    <div className={st.lds_roller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;