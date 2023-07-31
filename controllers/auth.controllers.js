const {response} = require('express')
const Usuario = require('../models/Usuario.js')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate.JWT.JS')

const login = async (req, res=response) =>{
    const {email,password} = req.body
    try {
        //Verificar si existe el Email en la base de datos
        const emailExiste = await Usuario.findOne({email})
        if(!emailExiste){
            return res.status(400).json({
                msg:"Email No Existe"
            })
        }
        //Verificar si el usuario esta activo
        if(emailExiste.estado === false){
            return res.status(400).json({
                msg:"El usuario No esta activo"
            })
        }

        //Verificar si el password es correcto y coincide con la llave
        const passwordValido = bcryptjs.compareSync(password,emailExiste.password);
        if(!passwordValido){
            return res.status(400).json({
                msg:"El password No es correcto"
            })
        } 

        //validacion de JSON WEB TOKEN

        const token = await generateJWT(Usuario.id)

        res.json({
            Usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg:"Datos insuficiente, contacto a servicio tecnico... Phidolly"
        })
    }

}


module.exports = {
    login
}