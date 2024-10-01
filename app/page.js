"use client";
import { useState, useEffect } from "react";
import Headtext from "./components/mainPage/Headtext";
import Input from "./components/ui/Input";
import Button from "./components/ui/Button";

export default function Home() {
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState(null);

  const handleButtonClick = async (e) => {
    e.preventDefault();

    alert(`You entered: ${secret}`);
    const response = await fetch("/api/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secret }),
    });

    const result = await response.json();
    setStatus(result);
    setSecret("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Headtext
        h1={"Enter your Secret key , Credentials , Api keys , Anything"}
        h2={"And Get a secure one-time link in return"}
      />
      <Input />
      <Button />
      <h1>Enter Something</h1>
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Type here"
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          color: "black",
        }}
        required
      />
      <br />
      <button
        onClick={handleButtonClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
      {status && (
        <div>
          {status.success ? (
            <p style={{ color: "green" }}>{status.link}</p>
          ) : (
            <p style={{ color: "red" }}>{status.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
