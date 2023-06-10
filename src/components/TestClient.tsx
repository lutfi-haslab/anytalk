"use client"
import React, { useState } from "react";

type Props = {};

const TestClient = (props: Props) => {
  const [data, setData] = useState("");

  return (
    <div>
      <h1>{data}</h1>
      <button onClick={() => setData("Halo")}>Set Data</button>
    </div>
  );
};

export default TestClient;
