const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');



const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo.',
            });
        }

        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Genear JWT  
        const token = await generateJWT( user._id, user.name );

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el adminsitrador',
        });
    }
}

const loginUser = async(req, res) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe.',
            });
        }

        // Confirmar passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta.',
            });
        }

        // Genear JWT  
        const token = await generateJWT( user._id, user.name );

        res.status(200).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el adminsitrador',
        });
    }
    
}

const revalidateToken = async (req, res) => {

    const { uid, name } = req;

    try {

        const token = await generateJWT( uid, name );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el adminsitrador',
        });
    }
}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}