export default async function handler(req, res) {
    try {
      const response = await fetch("https://pquotes.p.rapidapi.com/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "pquotes.p.rapidapi.com",
          "x-rapidapi-key": "cf9c490946msh2e58cbc68c2cd7ap1f2510jsnb70f75b0f400"
        },
        body: JSON.stringify({ topic: "fun" })
      });
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("❌ Error fetching quote:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  }
  
  