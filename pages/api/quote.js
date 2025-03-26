export default async function handler(req, res) {
    try {
      const response = await fetch("https://the-personal-quotes.p.rapidapi.com/quotes/tags/happiness", {
        method: "GET", 
        headers: {
          "x-rapidapi-host": "the-personal-quotes.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY 
        }
      });
  
      const data = await response.json();
      console.log("📦 API Response:", data);
  
      if (Array.isArray(data) && data.length > 0) {
        const random = data[Math.floor(Math.random() * data.length)];
        res.status(200).json({ quote: random.quote });
      } else {
        res.status(200).json({ quote: "No quotes available." });
      }
    } catch (error) {
      console.error("❌ Error fetching quote:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
}
  