export default function handler(req, res) {
    if (req.method === "POST") {
      const { email, password } = req.body;
  
      if (email === "test@example.com" && password === "123456") {
        return res.status(200).json({
          token: "fake-jwt-token",
          user: { name: "Test User", email },
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  