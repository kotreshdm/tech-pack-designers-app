import React from "react";
import { useMoveBack } from "../hooks/useMoveBack";
import { Button } from "flowbite-react";

export const PageNotFound = () => {
  const styles = {
    div: {
      alignItems: "center",
      justifyContent: "center",
      display: "grid",
      height: "20vh",
      padding: "30px",
      margin: "80px 0",
    },
  };

  const back = useMoveBack();
  return (
    <div style={styles.div} className='center h-20 mr-30'>
      <h1>Page not found 😢</h1>

      <Button
        onClick={() => {
          back();
        }}
      >
        Back
      </Button>
    </div>
  );
};
