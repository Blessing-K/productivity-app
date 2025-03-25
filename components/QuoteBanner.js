import { useEffect, useState } from "react";

export default function QuoteBanner() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://pquotes.p.rapidapi.com/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "pquotes.p.rapidapi.com",
        "x-rapidapi-key": "cf9c490946msh2e58cbc68c2cd7ap1f2510jsnb70f75b0f400"
      },
      body: JSON.stringify({ topic: "fun" }) // or "success", "love", etc.
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ PQuote:", data);
        if (data && data.quote) {
          setQuote(data.quote);
        } else {
          setQuote("No quote received.");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching quote:", err);
        setQuote("Couldn't load quote.");
      });
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
