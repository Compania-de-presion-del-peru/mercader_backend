const { response } = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.status(200).json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res = response) => {

    const {email, password, nombre} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya esta registrado'
            });
        }

        
        const usuario = new Usuario(req.body);
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        //guardar usuario
        await usuario.save();

        res.status(201).json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

    
}

const actualizarUsuario = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}