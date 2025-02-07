import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT || "3001", 10);

// Force port 3001 if 3000 is specified
const finalPort = port === 3000 ? 3001 : port;

export const config = {
  port: finalPort,
  host: process.env.HOST || "0.0.0.0",
  googleApiKey: process.env.GOOGLE_API_KEY,
  env: process.env.NODE_ENV || "development",
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};
