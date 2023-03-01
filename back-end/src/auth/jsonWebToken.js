const jswToken = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key');

const createToken = (data) => {
  const token = jswToken.sign({ ...data }, secret, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const payload = jswToken.verify(token, secret);
    req.body.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

module.exports = { createToken, validateToken };
