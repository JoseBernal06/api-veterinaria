
import { register } from "../controllers/veterinario_controller.js";
import { Router } from "express";

const router = Router() 

router.post('/registro', register)


export default router