"use client"
import { useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/identity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          phoneNumber
        })
      });

      const data = await res.json();

      setResponse(data);

    } catch (error) {
      console.error(error);
      setResponse({ error: "Request failed" });
    }

    setLoading(false);
  };

  return (

    <div style={{ padding: "2vw", fontFamily: "sans-serif" }}>

      <h1 style={{ fontSize: "3vw" }}>Bitespeed Identity Reconciliation</h1>

      <div style={{ marginTop: "3vw", gap: "3vw", display: "flex" }}>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", outline: "1px solid white", borderRadius: "5px" }}
        />

        <input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", outline: "1px solid white", borderRadius: "5px" }}
        />

        <button onClick={handleSubmit} style={{ color: "white", border: "1px solid white", borderRadius: "6px", backgroundColor: "#27272A", padding: "5px", cursor: "pointer" }}>
          Identify
        </button>

      </div>

      {loading && <p>Loading...</p>}
      <h1 style={{ fontSize: "2vw", marginTop: "5vw" }}>Outcome : </h1>
      {response && (
        <pre style={{ marginTop: "30px", color: "white", padding: "20px" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}

    </div>
  );
}

export default App;