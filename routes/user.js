import { Router } from 'express';
const router = Router();

import { getUser, updateUser } from '../controllers/user.js';

router.route('/').get(getUser).patch(updateUser);

export default router;
