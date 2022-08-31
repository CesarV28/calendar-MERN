const { validationResult } = require("express-validator");


const fieldsValidate = ( req, res, next ) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            erros: errors.mapped(),
        });
    }


    next();
}

module.exports ={
    fieldsValidate,
}