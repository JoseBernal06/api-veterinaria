

import Router from 'express'
import { actualizarPaciente, detallePaciente, eliminarPaciente, listarPacientes, loginPaciente, perfilPaciente, registrarPaciente } from '../controllers/paciente_controller.js'

const router=Router()


// rutas dueño
router.post('/paciente/login', loginPaciente)
router.get('/paciente/perfil', perfilPaciente)

// rutas mascota
router.get('/pacientes', listarPacientes)
router.get('/paciente/:id', detallePaciente)
router.post('/paciente/registro', registrarPaciente)
router.put('/paciente/actualizar/:id', actualizarPaciente)
router.delete('/paciente/eliminar/:id', eliminarPaciente)


export default router
