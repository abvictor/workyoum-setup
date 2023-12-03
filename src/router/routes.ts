import { Router } from 'express'
import { UserController } from '../controllers/register/controllerUserRegister';
import { UserLogin } from '../controllers/login/controllerUserLogin';

const router = Router ();
const userController = new UserController()
const loginController = new UserLogin()


router.get('/user', userController.list) 
router.post('/user', userController.create)
router.delete('/user/:id', userController.delete)
router.put('/user/:id', userController.update)


router.post('/user/login', loginController.login)




export default router;
