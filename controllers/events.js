const Event = require('../models/Event');

const getEvents = async(req, res) => {

    const events = await Event.find()
                              .populate('user','name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async( req, res ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const eventDB = await event.save();

        res.status(201).json({
            ok: true,
            event: eventDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }

}

const updateEvent = async( req, res ) => {

    const { id } = req.params;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(id);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid 
        }

        const eventUpdated = await Event.findByIdAndUpdate(id, newEvent,{ new: true });

        res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminsitrador.',
            id
        });
    }

    
}

const deleteEvent = async( req, res ) => {

    const { id } = req.params;
    const uid = req.uid;

    try {

        const event = await Event.findById(id);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        }

        await Event.findByIdAndDelete(id)

        res.status(201).json({
            ok: true,
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.',
            id
        });
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}