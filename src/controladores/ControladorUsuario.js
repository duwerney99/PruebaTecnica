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


module.exports = {
    RegistrarUsuario,
}