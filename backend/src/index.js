import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, model } = req.body;
    const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to separate code and documentation
    const codeMatch = text.match(/```[\s\S]*?```/);
    const code = codeMatch
      ? codeMatch[0].replace(/```[\w]*\n?|```/g, "")
      : text;
    const documentation = text.replace(/```[\s\S]*?```/g, "").trim();

    res.json({
      generatedCode: code,
      documentation: documentation,
      executionResults: "Code generated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate code" });
  }
});

const PORT = process.env.PORT || 3001;
// Ensure we're not trying to use port 3000
if (PORT === 3000) {
  console.warn(
    "Port 3000 is typically used by the frontend. Using 3001 instead.",
  );
  PORT = 3001;
}
app.listen(PORT, process.env.HOST || "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
