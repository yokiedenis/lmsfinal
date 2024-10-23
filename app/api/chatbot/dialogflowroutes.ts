import { Router } from 'express';
import { sendMessageToDialogflow } from './dialogflowcontroller';

const router: Router = Router();

router.post('/chat', sendMessageToDialogflow);

export default router;
