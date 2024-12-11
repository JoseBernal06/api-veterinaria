
import Veterinario from "../models/veterinario.js"
import  { sendMailRecoveryPassword, sendMailToUser } from "../config/nodemailer.js"
import generarJWT from "../helpers/crearJWT.js"

const register = async(req, res) => {
   
    // tomar datos de l request
    const {email, password}=req.body

    //validar datos
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Debes llenar todos los datos"})

    const verificarEmailBDD = await Veterinario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos el emial ya se encunetra registrado"})

    // interacturar BDD
    const nuevoVeterinario = new Veterinario(req.body)
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)

    const token = nuevoVeterinario.crearToken()
    await sendMailToUser(email,token)
    await nuevoVeterinario.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}


const confirmarEmail = async(req, res) => {
    
    // tomar datos del request
    const {token} = req.params
    
    // validar datos
    if(!(token)) return res.status(400).json({msg:"Lo sentimos no se pudo validar la cuenta"})
    
    const veterinarioBDD=Veterinario.findOne({token})
    if(!veterinarioBDD.token) return res.status(400).json({msg:"La cuenta ya ha sido confrimada"})

    // interacturar BDD
    veterinarioBDD.token=null
    veterinarioBDD.confirmarEmail=true
    await veterinarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes usar la cuenta"})
}


const login = async(req,res)=>{
    const {email,password} = req.body

    // validar datos
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const veterinarioBDD = await Veterinario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(veterinarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    if(!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await veterinarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    const tokenJWT=generarJWT(veterinarioBDD._id, "veterinario")
    res.status(200).json(veterinarioBDD, tokenJWT)

    //const {nombre,apellido,direccion,telefono,_id} = veterinarioBDD
    /*res.status(200).json({
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:veterinarioBDD.email
    })
    */
}

const recuperarPassword = async (req, res) => {

    // tomar datos del request
    const {email}=req.body

    // validar datos
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const veterinarioBDD = await Veterinario.findOne({email})
    if(!veterinarioBDD) return res.status(403).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})

    // interactuar BDD
    const token = veterinarioBDD.crearToken()
    veterinarioBDD.token=token
    await sendMailRecoveryPassword(email, token)
    await veterinarioBDD.save()
    res.status(200).json({msg:"Revisa tu correo electronico para restablecer la cuenta"})
}


const comprobarToken = (req, res) => {
    
    // tomar datos del request
    const {token} = req.params

    // validar datos
    if(!(token)) return res.status(400).json({msg:"Lo sentimos no se pudo validar la cuenta"})
    const veterinarioBDD=Veterinario.findOne({token})
    if(veterinarioBDD?.token!==token) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    
    // interactuar BDD
    veterinarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear un nuevo password"})
}


const nuevoPassword = async (req, res) => {
    // tomar datos del request
    const {password, confirmPassword} = req.body

    //validar datos
    if(Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password!=confirmPassword) return res.status(404).json({msg:"Lo sentimos, lo passwords no coinciden"})
    
    const veterinarioBDD=await Veterinario.findOne({token:req.params.token})
    if(veterinarioBDD?.token!==req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})

    // interactuar BDD
    veterinarioBDD.token=null
    veterinarioBDD.password= await veterinarioBDD.encrypPassword(password)
    await veterinarioBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}


export {
    register,
    confirmarEmail,
    login,
    recuperarPassword,
    comprobarToken,
    nuevoPassword
}

