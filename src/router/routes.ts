import { Router } from 'express'
import { UserController } from '../controllers/user/controllerUserRegister';

const router = Router ();
const userController = new UserController()


router.get('/user', userController.list) 
router.post('/user', userController.create)
router.delete('/user/:id', userController.delete)
router.put('/user/:id', userController.update)




export default router;
