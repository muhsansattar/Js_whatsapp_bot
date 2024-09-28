import { Router } from 'express';
import WhatsappBot from '../controllers/WhatsappBot';

const botRouter = Router();

botRouter.post('/', WhatsappBot.googleSearch);

export default botRouter;