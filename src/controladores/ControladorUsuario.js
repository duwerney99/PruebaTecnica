const servicio = require('../servicio/ServicioUsuario')
// const repositorio = require('../repositorios/UsuarioRepositorio')


const RegistrarUsuario = async (req, res) => {
    try{
        const UsuarioRegistrado = await servicio.RegistrarUsuario(req.body)
        res.send({ status: 'OK', data: UsuarioRegistrado })
    }catch (e) {
        console.log("Error registrando el usuario ", e)
    }
}


const InicioSesion = async (req, res) => {
    try {
        const token = await servicio.InicioSesion(req.body)
        res.send({ status: 'OK', data: token })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


module.exports = {
    RegistrarUsuario,
    InicioSesion,
}