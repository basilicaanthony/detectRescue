// authRouter.js

import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput } from '../middleware/validationMiddleware.js';
import { logout } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js'; // Import the authenticateUser middleware

const router = Router();

// Apply authenticateUser middleware to register and login routes
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

router.get('/logout', logout);

export default router;
