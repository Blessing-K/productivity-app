import { useEffect, useState } from "react";

export default function QuoteBanner() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
  fetch("/api/quote")
    .then(res => res.json())
    .then(data => setQuote(data.quote))
    .catch(() => setQuote("Couldn't load quote"));
}, []);


  return (
    <div style={{
      marginTop: "1rem",
      padding: "1rem",
      background: "#e0e0e0",
      borderRadius: "6px",
      fontStyle: "italic"
    }}>
      {quote || "Loading quote..."}
    </div>
  );
}
