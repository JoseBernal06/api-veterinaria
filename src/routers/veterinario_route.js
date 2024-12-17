
import { actualizarpasswordVeterianrio, actualizarVeterianrio, comprobarToken, confirmarEmail, detallesVeterianrio, login, nuevoPassword, recuperarPassword, register } from "../controllers/veterinario_controller.js";
import { Router } from "express";
import { verificarAutenticacion } from "../helpers/crearJWT.js";

const router = Router() 


// publicas
router.post('/registro', register)
router.post('/login', login)
router.get('/confirmar/:token', confirmarEmail)
router.post('/recuperar-password', recuperarPassword)
router.get('/recuperar-password/:token', comprobarToken)
router.post('/nuevo-password/:token', nuevoPassword)


// privadas
router.get('/detalleVeterinario', verificarAutenticacion, detallesVeterianrio)
router.get('/actualizarVeterinario', verificarAutenticacion, actualizarVeterianrio)
router.get('/actualizarpassword', verificarAutenticacion, actualizarpasswordVeterianrio)

export default router



