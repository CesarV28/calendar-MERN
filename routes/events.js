/*
    Rutas de Usuario / Events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/jwt-validator');


const { 
    getEvents, 
    createEvent, 
    updateEvent, 
    deleteEvent 
} = require('../controllers/events');
const { fieldsValidate } = require('../middlewares/fields-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( validateJWT );

router.get('/', getEvents);

router.post('/', [
    check('title', 'El titulo es obligatorio.').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria.').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria.').custom( isDate ),
    fieldsValidate
],createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);



module.exports = router;