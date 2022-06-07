import React from "react";

const StepName = (props: any) => {
  return (
    <>
      <div>StepName</div>
      <button onClick={props.onClick}>Next</button>;
    </>
  );
};

export default StepName;
