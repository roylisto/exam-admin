const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!decoded) return res.status(500).json({ message: 'missing token' });
    return next();
  });
}