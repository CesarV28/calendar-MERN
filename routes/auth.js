/*
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { 
    createUser, 
    loginUser, 
    revalidateToken
} = require('../controllers/auth');

const { fieldsValidate } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();


router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    fieldsValidate
], createUser);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldsValidate
],loginUser);


router.get('/renew', [
    validateJWT
],revalidateToken);




module.exports = router;