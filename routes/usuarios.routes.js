/*
*Ruta: /api/usuarios
*/
const { Router } = require('express');
const {getUsuarios, crearUsuario, actualizarUsuario} = require('../controllers/usuario')
const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.get( '/', getUsuarios);

router.post( '/',
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('email', 'El email es incorrecto').isEmail(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        validarCampos
    ],
    crearUsuario
);

router.put('/:id',
 [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email es incorrecto').isEmail(),
    check('role', 'La rol es requerido').not().isEmpty(),
    validarCampos
 ],
 actualizarUsuario
);


module.exports = router;