import React from "react";
import { Button } from "flowbite-react";
import { useMoveBack } from "../../hooks/useMoveBack";

export const Unauthorized = () => {
  const styles = {
    outerdiv: { display: "relative ", margin: "auto" },
    innnerDiv: {
      display: "inline-grid",
      margin: "150px 400px",
    },
  };

  const back = useMoveBack();
  return (
    <div class={styles.outerdiv}>
      <div style={styles.innnerDiv}>
        <h1>Page not found Please contact admin 😢</h1>
        <Button
          onClick={() => {
            back();
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
