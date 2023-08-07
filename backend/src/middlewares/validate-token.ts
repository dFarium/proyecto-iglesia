const jwt = require('jsonwebtoken')

// middleware para validar token (rutas protegidas)
export const verifyToken = (req, res, next) => {
    console.log(req.headers);
    const token = req.header('auth-token')
    console.log("Token recibido: ", token)

    if (!token) return res.status(401).json({ error: 'Acceso denegado' })

    // Se verifica si existe el token
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("Token verificado: ", verified)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}