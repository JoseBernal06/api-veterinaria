
import { comprobarToken, confirmarEmail, login, nuevoPassword, recuperarPassword, register } from "../controllers/veterinario_controller.js";
import { Router } from "express";

const router = Router() 

router.post('/registro', register)
router.get('/confirmar/:token', confirmarEmail)
router.post('/recuperar-password', recuperarPassword)
router.post('/login', login)
router.get('/recuperar-password/:token', comprobarToken)
router.post('/nuevo-password/:token', nuevoPassword)


export default router