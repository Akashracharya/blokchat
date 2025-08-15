import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/gemini", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    console.log("🔍 Full Gemini result:", JSON.stringify(result, null, 2));

    let reply = "No response";
    if (result?.candidates?.length > 0) {
      const parts = result.candidates[0]?.content?.parts;
      const textPart = parts?.find(p => p.text);
      if (textPart) reply = textPart.text;
    }

    res.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Error fetching Gemini response" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
