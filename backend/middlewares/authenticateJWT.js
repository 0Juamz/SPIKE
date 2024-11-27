import jwt from 'jsonwebtoken'

// Middleware para verificar o JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Assumindo que o token vem como Bearer token
    if (!token) return res.status(401).send('Acesso negado');
  
    jwt.verify(token, process.env("JWT_SECRET"), (err, user) => {
      if (err) return res.status(403).send('Token inválido');
      req.user = user;
      next();
    });
  };

export {
    authenticateJWT
}