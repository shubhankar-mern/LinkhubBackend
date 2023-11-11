import { Router } from 'express';


const router = Router();
import * as allControllers from '../controllers/index.js';


const secretKey = 'your-secret-key';

router.post('/postlink', allControllers.linksPost);
router.get('/linkfetch', allControllers.linksFetch);
router.delete('/delete', allControllers.profileDelete);
router.post('/register',allControllers.register);
router.post('/login',allControllers.login);
router.get('/linkhub/:linkId',allControllers.dataFetch)


export default router;