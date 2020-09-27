const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!decoded || decoded.data.role != 'superadmin') {
      return res.status(500).json({ message: 'missing token' });
    }

    req.decoded = decoded
    return next();
  });
}