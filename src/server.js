// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerVeterianria from './routers/veterinario_route.js';

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use('/api', routerVeterianria)

app.use((req, res)=> res.status(400).send("Endpoint no encontrado"))

// Exportar la instancia de express por medio de app
export default  app