export async function GET() {
    const quotes = [
      "Believe you can and you're halfway there.",
      "Don’t watch the clock; do what it does. Keep going.",
      "Dream big. Start small. Act now.",
      "Success is not for the lazy.",
      "Push yourself, because no one else is going to do it for you."
    ];
  
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
    return new Response(JSON.stringify({ quote: randomQuote }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  