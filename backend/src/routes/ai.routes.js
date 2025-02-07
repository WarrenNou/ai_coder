import express from 'express';
import { aiService } from '../services/aiService.js';

const router = express.Router();

router.post('/generate', async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required',
      });
    }

    const result = await aiService.generateCode(prompt);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
