import Paciente from "../models/paciente.js"



const loginPaciente = (req, res) => {
    res.send("Login del dueño")
}

const perfilPaciente = (req, res) => {
    res.send("Mostrar datos del dueño")
}

const registrarPaciente = async (req, res) => {
    const {email} = req.body
    const verificarEmailBDD = await Paciente.findOne({email})
    console.log(verificarEmailBDD)

    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoPaciente = new Paciente(req.body)
    await nuevoPaciente.save()
    res.status(200).json({msg:"Registro exitoso de paciente"})
}

const listarPacientes = (req, res) => {
    res.send("Listado de los pacientes")
}

const detallePaciente = (req, res) => {
    res.send("Detalle del paciente")
}

const actualizarPaciente = (req, res) => {
    res.send("Actualizar paciente")
}

const eliminarPaciente = (req, res) => {
    res.send("Eliminar paciente")
}


export {
    loginPaciente,
    perfilPaciente,
    registrarPaciente,
    listarPacientes,
    detallePaciente,
    actualizarPaciente,
    eliminarPaciente
}

