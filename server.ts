import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the /chat endpoint
app.post('/chat', (req: Request, res: Response) => {
  const userMessage: string = req.body.userMessage;

  // Simulated bot response logic
  if (userMessage) {
    const botReply = `You said: ${userMessage}`;
    return res.json({ reply: botReply });
  } else {
    return res.status(400).json({ reply: 'No message received' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
