import { Router } from 'express';
import { createJobRequest, getClientJobs, getJobDetails } from '../controllers/jobController';
import { authenticateToken } from '../middleware/middleware';

const router = Router();

router.post('/', authenticateToken, createJobRequest);
router.get('/', authenticateToken, getClientJobs);
router.get('/:id', authenticateToken, getJobDetails);

export default router;
