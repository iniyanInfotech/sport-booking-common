import express from 'express';
import { generateSuccessResponse } from '../shared/response';

const router = express.Router();

router.get('', (req, res) => {
    return generateSuccessResponse('success', true, { success: true }, res);
})

export default router;