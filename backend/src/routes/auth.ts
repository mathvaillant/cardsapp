import { Router } from 'express';

import { signUp } from '../controllers/auth/signup';
import { login } from '../controllers/auth/login';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;
