import express from 'express';
import { loginAngelOne } from '../controllers/angelController.js';

const router = express.Router();

// Define route for Angel One login
router.post('/login', loginAngelOne);

export default router;
